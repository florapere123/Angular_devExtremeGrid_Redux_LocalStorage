import { Component, OnInit, ViewChild } from '@angular/core'
import { AppStore } from 'src/app/store/store'
import { RateItemActions } from 'src/app/api/rateitem.actions'
import { DxDataGridComponent } from 'devextreme-angular'
import { DxButtonModule } from 'devextreme-angular'
@Component({
    selector: 'app-list-tnstoday',
    templateUrl: './list-tnstoday.component.html',
    styleUrls: ['./list-tnstoday.component.css'],
})
export class ListTnstodayComponent implements OnInit {
    @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent
    events: Array<string> = []
    focusedRowKey: number = 0

    constructor(private store: AppStore) {}
    sorting: { ByDate: boolean; ByRate: boolean } = {
        ByDate: false,
        ByRate: false,
    }
    ngOnInit() {}

    get state() {
        let data = this.store.getState()
        return data
    }
    logEvent = (eventName) => {
        this.events.unshift(eventName)
    }
    ///
    ///implementation of event of grid
    ///
    onFocusedRowChanging = (e) => {
        console.log(e)
        var rowsCount = e.component.getVisibleRows().length,
            pageCount = e.component.pageCount(),
            pageIndex = e.component.pageIndex(),
            key = e.event && e.event.key

        if (key && e.prevRowIndex === e.newRowIndex) {
            if (e.newRowIndex === rowsCount - 1 && pageIndex < pageCount - 1) {
                e.component.pageIndex(pageIndex + 1).done(function () {
                    e.component.option('focusedRowIndex', 0)
                })
            } else if (e.newRowIndex === 0 && pageIndex > 0) {
                e.component.pageIndex(pageIndex - 1).done(function () {
                    e.component.option('focusedRowIndex', rowsCount - 1)
                })
            }
        }
    }
    ///
    ///implementation of event manually through button execution
    ///
    onChangeOneRowDown = () => {
        let _data = this.store.getState().rateItemsState.rateItems
        let visibleRows = this.dataGrid.instance.getVisibleRows()
        let currentPage = this.dataGrid.instance.pageIndex()
        let pageSize = this.dataGrid.instance.pageSize()
        if (this.dataGrid.focusedRowKey === undefined) {
            let firstItem = visibleRows[0].data
            this.dataGrid.instance.option('focusedRowKey', firstItem.id)
            this.dataGrid.instance.navigateToRow(firstItem.id)
        }
        let toIndex = 1,
            fromIndex = 0
        if (this.dataGrid.focusedRowIndex + 1 == pageSize) {
            ;(toIndex = (_data as any).indexOf(visibleRows[0].data)),
                (fromIndex = (_data as any).indexOf(visibleRows[pageSize - 1].data))
        } else {
            ;(toIndex = (_data as any).indexOf(visibleRows[this.dataGrid.focusedRowIndex + 1].data)),
                (fromIndex = (_data as any).indexOf(visibleRows[this.dataGrid.focusedRowIndex].data))
        }
        let currentItemIndex = fromIndex
        if (fromIndex == pageSize * currentPage) {
            currentItemIndex = 0
        }
        if (fromIndex > pageSize * currentPage) {
            currentItemIndex = fromIndex - pageSize * currentPage
        }

        let currentItem = this.dataGrid.instance.getVisibleRows()[currentItemIndex].data
        ;(_data as any).splice(fromIndex, 1)
        ;(_data as any).splice(toIndex, 0, currentItem)

        this.dataGrid.instance.option('focusedRowKey', currentItem.id)
        this.dataGrid.instance.navigateToRow(currentItem.id)
        this.selectRateItemStore(currentItem)
        this.dataGrid.instance.refresh()
    }
    ///
    ///implementation of event of grid of reordering by dragging rows
    ///
    onReorder = (e) => {
        let _data = this.store.getState().rateItemsState.rateItems
        let visibleRows = e.component.getVisibleRows(),
            toIndex = (_data as any).indexOf(visibleRows[e.toIndex].data),
            fromIndex = (_data as any).indexOf(e.itemData)

        ;(_data as any).splice(fromIndex, 1)
        ;(_data as any).splice(toIndex, 0, e.itemData)
    }
    ///
    ///implementation of event of grid manually through button execution
    ///
    sortRateItemByDate() {
        this.sorting.ByDate = !this.sorting.ByDate
        console.log('sortByDateASC', this.sorting.ByDate)
        this.store.dispatch({
            type: RateItemActions.ORDER_BY_DATE,
            payload: this.sorting,
        })
    }
    ///
    ///implementation of event of grid manually through button execution
    ///
    sortRateItemByRate() {
        this.sorting.ByRate = !this.sorting.ByRate
        console.log('ByRate', this.sorting.ByRate)
        this.store.dispatch({
            type: RateItemActions.ORDER_BY_RATE,
            payload: this.sorting,
        })
    }
    ///
    ///implementation of event of grid of selection particular element
    ///
    onSelectionChanged(e) {
        const rateItem = e.selectedRowsData[0]
        this.selectRateItemStore(rateItem)
    }
    selectRateItemStore = (rateItem) => {
        this.store.dispatch({
            type: RateItemActions.SELECT_RATEITEM,
            payload: rateItem,
        })
    }
}
