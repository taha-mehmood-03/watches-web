import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import imageReducer from '../ImageManagement';
import watchReducer from '../WatchManagement';
import inputReducer from '../InputManagement';
import DatabasedataReducer from '../DatabasedataManagement';
import CartDatabasedataReducer from '../Cartdatabase';
import user_idReducer from '../UserId';
import authReducer from '../Authentication'; // Update the path as needed

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  image: imageReducer,
  watch: watchReducer,
  input: inputReducer,
  Databasedata: DatabasedataReducer,
  CartDatabasedata: CartDatabasedataReducer,
  user_id: user_idReducer,
  auth: authReducer,
});

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed to ignore non-serializable actions from redux-persist
    }),
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
