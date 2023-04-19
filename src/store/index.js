import { configureStore,combineReducers } from '@reduxjs/toolkit';
import {persistReducer,persistStore} from 'redux-persist';
import movieReducer from '../slice/movieSlice';
import trailerReducer from '../slice/trailerSlice'
import favoriteReducer from '../slice/favoriteSlice'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whileList: ['favorite']
};



const rootReducer = combineReducers({
  movie: movieReducer,
  trailer: trailerReducer,
  favorite: favoriteReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false,
      }),
});


export const persistor = persistStore(store);