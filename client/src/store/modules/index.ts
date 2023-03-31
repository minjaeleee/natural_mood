import { composeWithDevTools } from "redux-devtools-extension"
import { combineReducers, legacy_createStore as createStore } from "redux";
import { persistStore } from 'redux-persist';
import { persistReducer } from "redux-persist";
import { cart } from "./cart";
import { auth } from "./auth";
import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  // localStorage에 저장
  storage,
  whitelist: ["cart","auth"],
}

const rootReducer = combineReducers({cart, auth})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)

