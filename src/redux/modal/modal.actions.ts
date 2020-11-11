import modalTypes from './modal.types';
import * as ContactTypes from '../../types/contactsReducerTypes'

export const setModalState = (actionType: string)=> {
  return {
    type: modalTypes.SET_MODAL_STATE,
    payload: actionType
  };
};
export const setModalData = (contact: ContactTypes.Contact | null) => {
  return {
    type: modalTypes.SET_MODAL_DATA,
    payload: contact
  }
}