import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import darkModeReducer from './slices/theme/dark-mode';
import calendarReducer from './slices/theme/calendar';
import mailReducer from './slices/theme/mail';
import chatReducer from './slices/theme/chat';
import blogReducer from './slices/theme/blog';
import productReducer from './slices/theme/product';
import userReducer from './slices/theme/user';
import notificationsReducer from './slices/theme/notifications';
import photoSlice from './slices/medicly/photoSlice';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  version: 1,
  whitelist: ['theme']
};

const productPersistConfig = {
  key: 'product',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: ['isLoading', 'error', 'products', 'product', 'filters']
};

const profilePersistConfig = {
  key: 'profile',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: ['isLoading', 'error']
};

const userPersistConfig = {
  key: 'user',
  storage: storage,
  keyPrefix: 'redux-',
  blacklist: ['isLoading', 'error']
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  theme: darkModeReducer,
  calendar: calendarReducer,
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  product: persistReducer(productPersistConfig, productReducer),
  user: userReducer,
  notifications: notificationsReducer,
  bloodTestPhoto:  persistReducer(productPersistConfig, photoSlice.reducer),
});

export { rootPersistConfig, rootReducer };
