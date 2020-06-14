export class IRateItem {
    id: number
    Rate: number
    Date: Date
}

export interface IRateItemState {
    rateItems: IRateItem[]
    selectedRateItem: IRateItem
    filter: number
    sorting: { ByDate: boolean; ByRate: boolean }
}
