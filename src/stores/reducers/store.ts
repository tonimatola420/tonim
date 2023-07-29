import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action, 
} from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { productsSlice } from "./productsSlice";
import { cartProductsSlice } from "./cartProductsSlice";
// import { recordSlice } from "./recordSlice";
import { erpSlice } from "./erpSlice";
import { ledgerSlice } from "./ledger.slice";
import thunkMiddleware from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [productsSlice.name]: productsSlice.reducer,
  [cartProductsSlice.name]: cartProductsSlice.reducer,
  [erpSlice.name]: erpSlice.reducer,
  [ledgerSlice.name]: ledgerSlice.reducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware),
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side

    const persistConfig = {
      key: "nextjs",
      whitelist: ["auth", "products", "cartProducts", "erp", "ledger",], // make sure it does not clash with server keys
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production",
    });

    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

let store: any = configureStore({reducer: rootReducer,});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const wrapper = createWrapper<AppStore>(makeStore);
