import { Component, OnInit, Input } from '@angular/core';
import { IRateItem } from 'src/app/model/rateItem.model';
import { AppStore } from 'src/app/store/store';
import { RateItemActions } from 'src/app/api/rateitem.actions';

@Component({
  selector: 'app-detailed-tnstoday',
  templateUrl: './detailed-tnstoday.component.html',
  styleUrls: ['./detailed-tnstoday.component.scss']
})
export class DetailedTnstodayComponent implements OnInit {

  rateItemClone: IRateItem = null;

  @Input()
  set rateItem(rateItem: IRateItem) {
    this.rateItemClone = JSON.parse(JSON.stringify(rateItem));
  }

  constructor(private store: AppStore) { }

  ngOnInit(): void {
  }

  update() {
    if (this.rateItemClone.id) {
      this.store.dispatch({
        type: RateItemActions.UPDATE_RATEITEM,
        payload: this.rateItemClone
      });
    } else {
      this.store.dispatch({
        type: RateItemActions.CREATE_RATEITEM,
        payload: this.rateItemClone
      });
    }

  }
  delete() {
    this.store.dispatch({
      type: RateItemActions.DELETE_RATEITEM,
      payload: this.rateItemClone
    });
  }

}
