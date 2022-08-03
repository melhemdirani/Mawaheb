import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import PageReducer from './pages/pages.reducer';




const rootReducer = combineReducers({
  signedIn: userReducer,
  signedOut: userReducer,
  role: userReducer,
  name: userReducer,
  user: userReducer,
  notifications: userReducer,
});

export default rootReducer;
