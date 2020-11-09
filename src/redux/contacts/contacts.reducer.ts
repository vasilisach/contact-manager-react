import contactsTypes from './contacts.types';
import * as allContactsTypes from '../../types/contactsReducerTypes';

const initialState:allContactsTypes.ContactsState = {
  userContacts: [],
  favouriteContacts: []
};


const contactsReducer = (state = initialState, action:allContactsTypes.ContactsActions) => {
  switch (action.type) {
    case contactsTypes.SET_CONTACTS:
    return {
      ...state,
      userContacts: action.payload
    };
    case contactsTypes.GET_FAVOURITE_CONTACTS:
      return {
        ...state,
        favouriteContacts: action.payload
      };
  
    default:
      return state;
  }
};

export default contactsReducer;