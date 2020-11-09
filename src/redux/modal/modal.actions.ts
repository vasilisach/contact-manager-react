import modalTypes from './modal.types';
import * as ContactModalTypes from '../../types/contactsReducerTypes';

export const showContactModal = (actionType: ContactModalTypes.ShowModal)=> {
  return {
    type: modalTypes.SHOW_CONTACT_MODAL,
    payload: actionType
  };
};