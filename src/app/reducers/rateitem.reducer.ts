import { IRateItemState, IRateItem } from '../model/rateItem.model'
import { RateItemActions } from '../api/rateitem.actions'
import SampleJson from '../../assets/tnsTodayChart.json'
import * as _ from 'lodash'
type ActionHandler = (state: IRateItemState, actType: any) => IRateItemState

interface HandlersMap {
    [actionType: string]: ActionHandler
}

const handlers: HandlersMap = {
    [RateItemActions.UPDATE_RATEITEM]: updateRateItem,
    [RateItemActions.SELECT_RATEITEM]: selectRateItem,
    [RateItemActions.DELETE_RATEITEM]: deleteRateItem,
    [RateItemActions.CREATE_RATEITEM]: createRateItem,
    [RateItemActions.UPDATE_FILTER]: updateRateItemFilter,
    [RateItemActions.ORDER_BY_DATE]: orderByDate,
    [RateItemActions.ORDER_BY_RATE]: orderByRate,
}
const getContentJSON = (jsonFile) => {
    let _rateItems: IRateItem[] = []

    jsonFile.map((item, index) => {
        const _item: IRateItem = {
            id: index + 1,
            Rate: item.Rate,
            Date: new Date(item.Date),
        }
        _rateItems.push(_item)
    })

    return _rateItems
}
const SOME_INITIAL_STATE: IRateItemState = {
    rateItems: getContentJSON(SampleJson),
    selectedRateItem: null,
    filter: null,
    sorting: {
        ByDate: false,
        ByRate: false,
    },
}

export function createRateItemReducer() {
    return function rateItemReducer(state: IRateItemState = SOME_INITIAL_STATE, action): IRateItemState {
        if (handlers[action.type]) {
            return handlers[action.type](state, action)
        }

        return state
    }
}

//////////////
// HANDLERS //
//////////////

function updateRateItem(state: IRateItemState, action: any) {
    const e = action.payload
    const ds = state.rateItems.map((item) =>
        item.id === e.id
            ? {
                  ...item,
                  ...e,
              }
            : item
    )

    return {
        ...state,
        rateItems: ds,
    }
}

function selectRateItem(state: IRateItemState, action: any) {
    const rateitem = action.payload
    return {
        ...state,
        selectedRateItem: rateitem,
    }
}

function deleteRateItem(state: IRateItemState, action: any) {
    const rateItem = action.payload
    const rateItems = state.rateItems.filter((p) => p.id !== rateItem.id)

    return {
        ...state,
        rateItems,
        selectedRateItem: null,
    }
}

function createRateItem(state: IRateItemState, action: any) {
    const rateItems = [...state.rateItems, { id: new Date().getTime(), ...action.payload }]

    return {
        ...state,
        rateItems,
    }
}

function updateRateItemFilter(state: IRateItemState, action: any) {
    return {
        ...state,
        filter: action.payload,
    }
}

function orderByDate(state: IRateItemState, action: any) {
    var rateItems = _.orderBy(
        state.rateItems,
        ['currentDate', 'Rate'],
        [action.payload.ByDate ? 'asc' : 'desc', action.payload.ByRate ? 'asc' : 'desc']
    )
    return {
        ...state,
        rateItems,
        sorting: action.payload,
    }
}
function orderByRate(state: IRateItemState, action: any) {
    var rateItems = _.orderBy(
        state.rateItems,
        ['Date', 'Rate'],
        [action.payload.ByDate ? 'asc' : 'desc', action.payload.ByRatee ? 'asc' : 'desc']
    )
    return {
        ...state,
        rateItems,
        sorting: action.payload,
    }
}
