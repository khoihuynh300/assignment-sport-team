import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import filterReducer from './features/filter/filterSlice';
import toastReducer from './features/toast/toastSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = { key: 'root', version: 1, storage, blacklist: ['filter', 'toast'] };

const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterReducer,
  toast: toastReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
