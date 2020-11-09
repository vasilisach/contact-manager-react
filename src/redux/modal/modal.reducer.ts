import modalTypes from './modal.types';
import * as ContactModalTypes from '../../types/contactsReducerTypes';

const initialState : ContactModalTypes.ShowModalState = {
  showModal: false
};

const modalReducer = (state = initialState, action:ContactModalTypes.ShowModalActions) => {
  switch (action.type) {
    case modalTypes.SHOW_CONTACT_MODAL:
      return {
        ...state,
        showModal: action.payload
      };
  
    default:
      return state;
  }
};

export default modalReducer;