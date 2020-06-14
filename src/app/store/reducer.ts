import { Reducer, combineReducers} from 'redux';
import { IAppState } from './model';

import { createRateItemReducer } from '../reducers/rateitem.reducer';

export const reducerMap = {
    rateItemsState: createRateItemReducer()
};

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>(reducerMap);




