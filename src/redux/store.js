import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import { APP_NAME } from "../config";

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

const SetTransform = createTransform(
  (inboundState) => {
    return {
      isLogined: inboundState.isLogined,
      accessToken: inboundState.accessToken,
      refreshToken: inboundState.refreshToken,
      isRememberme: inboundState.isRememberme,
    };
  },
  (outboundState) => {
    return outboundState;
  },
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: APP_NAME,
  storage,
  whitelist: ["auth"],
  transforms: [SetTransform],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export default { store, persistor };
