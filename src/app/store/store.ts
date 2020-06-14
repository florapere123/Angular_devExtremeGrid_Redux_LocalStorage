import { createStore,  Store, StoreEnhancer,  applyMiddleware,
  Dispatch, Reducer, Unsubscribe, combineReducers, compose } from 'redux';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadState, saveState } from './localStorage';

import { IAppState } from './model';
import { rootReducer, reducerMap } from './reducer';

const devtools: StoreEnhancer <IAppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;
//https://jsonplaceholder.typicode.com/posts
export function createAppStore(): Store <IAppState> {

  // CREATE //

  const persistedState = loadState();
  const store = <AppStore>createStore<IAppState> (
    rootReducer,persistedState, composeWithDevTools(applyMiddleware(thunk, createLogger()),devtools)
  );

  // EXTEND //

  store.currentReducerMap = reducerMap;

  store.extendReducer = (reducerKey) => {

    store.currentReducerMap = {
      ...store.currentReducerMap,
      ...reducerKey
    };

    store.replaceReducer(combineReducers(store.currentReducerMap));
  };

  store.subscribe(() => {
    saveState(store.getState());
  });

  // DEBUG //

  (<any>window).app = {
    store,
    get state() {
      return store.getState();
    }
  };

  return store;
}

export abstract class AppStore {
  currentReducerMap: { [key: string]: Reducer<any> }; // CUSTOM

  abstract dispatch: Dispatch<IAppState>;
  abstract getState(): IAppState;
  abstract OrderByDate(sortAsc:boolean): IAppState;
  abstract OrderByRate(sortAsc:boolean): IAppState;
  abstract subscribe(listener: () => void): Unsubscribe;
  abstract replaceReducer(nextReducer: Reducer<IAppState>): void;

  abstract extendReducer(reducerKey: { [key: string]: Reducer<any> }); // CUSTOM
}

export const appStoreProviders = [{
  provide: AppStore,
  useFactory: createAppStore
}];
