import contactsTypes from './contacts.types';

export const setContacts = contacts => {
  return {
    type: contactsTypes.SET_CONTACTS,
    payload: contacts
  };
};

export const getFavouriteContacts = contacts => {
  return {
    type: contactsTypes.GET_FAVOURITE_CONTACTS,
    payload: contacts
  };
};
