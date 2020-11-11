import modalTypes from './modal.types';
import * as ContactModalTypes from '../../types/contactsReducerTypes';

const initialState : ContactModalTypes.ModalState = {
  modalState: 'close',
  modalData: null
};

const modalReducer = (state = initialState, action:ContactModalTypes.ShowModalActions) => {
  switch (action.type) {
    case modalTypes.SET_MODAL_STATE:
      return {
        ...state,
        modalState: action.payload
      };
    case modalTypes.SET_MODAL_DATA:
      return {
        ...state,
        modalData: action.payload
      }
    
    default:
      return state;
  }
};

export default modalReducer;