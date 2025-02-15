import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "./features/authSlice";
import { walletReducer } from "./features/walletSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const isClient = typeof window !== "undefined";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "auth",
  storage: isClient? storage : createNoopStorage(),
  whitelist: ["authState", "userEmail"],
};

const walletPersistConfig = {
  key: "wallet",
  storage: isClient? storage : createNoopStorage(),
  whitelist: ["wallet", "loading", "error"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedWalletReducer = persistReducer(walletPersistConfig, walletReducer);

const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    wallet: persistedWalletReducer,

});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;