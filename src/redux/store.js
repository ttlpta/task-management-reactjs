import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";
import taskReducer from "./slices/taskSlice";
import { APP_NAME } from "../config";

const appReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  task: taskReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logout") {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const SetTransform = createTransform(
  (inboundState) => {
    return {
      accessToken: inboundState.accessToken,
      refreshToken: inboundState.refreshToken,
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

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

const S = { store, persistor };

export default S;
