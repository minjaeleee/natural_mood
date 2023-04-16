import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import ReduxThunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"
import { composeWithDevTools } from "redux-devtools-extension"

import { cart } from "./cart";
import { auth } from "./auth";
import { aritlce } from "./article";

const persistConfig = {
  key: "root",
  // localStorage에 저장
  storage,
  whitelist: ["auth"],
}

const rootReducer = combineReducers({cart, auth, aritlce})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))
export const persistor = persistStore(store)

