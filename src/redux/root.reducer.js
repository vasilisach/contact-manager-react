import { combineReducers } from 'redux';
import authReducer from './auth/auth.reducer';
import contactsReducer from './contacts/contacts.reducer';
import modalReducer from './modal/modal.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    contacts: contactsReducer,
    contactModal: modalReducer,
    favourites: contactsReducer
});

export default rootReducer;