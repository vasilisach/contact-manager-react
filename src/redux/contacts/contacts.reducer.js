import contactsTypes from './contacts.types';

const initialState = {
  userContacts: [],
  favouriteContacts: []
};


const contactsReducer = (state = initialState, action) => {
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