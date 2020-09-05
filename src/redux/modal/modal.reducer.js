import modalTypes from './modal.types';

const initialState = {
  showModal: false
};

const modalReducer = (state = initialState, action) => {
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