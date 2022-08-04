import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import PageReducer from './pages/pages.reducer';


const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['']
};

const rootReducer = combineReducers({
  signedIn: userReducer,
  signedOut: userReducer,
  role: userReducer,
  name: userReducer,
  user: userReducer,
  id: userReducer,
  notifications: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
