import { composeWithDevTools } from "redux-devtools-extension"
import { combineReducers, legacy_createStore as createStore } from "redux";
import {persistStore} from 'redux-persist';

import {persistReducer} from "redux-persist";
import { cart } from "./cart";
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "cart",
  // localStorage에 저장
  storage,
  whitelist: ["cart"],
}

const rootReducer = combineReducers({cart})
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)

