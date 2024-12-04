import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletReducer from "./features/walletSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "doginal-bot",
  storage,
  whiteList: ["wallet"],
};

const rootReducer = combineReducers({
  wallet: walletReducer,
});

const persistedWalletReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedWalletReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
