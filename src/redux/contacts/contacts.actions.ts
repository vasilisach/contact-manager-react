import contactsTypes from './contacts.types';
import * as contactsReducerTypes from '../../types/contactsReducerTypes';

export const setContacts = (contacts:contactsReducerTypes.Contact[]) => {
  return {
    type: contactsTypes.SET_CONTACTS,
    payload: contacts
  };
};

export const getFavouriteContacts = (contacts:contactsReducerTypes.Contact[]) => {
  return {
    type: contactsTypes.GET_FAVOURITE_CONTACTS,
    payload: contacts
  };
};