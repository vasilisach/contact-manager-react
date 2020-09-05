import modalTypes from './modal.types';

export const showContactModal = actionType=> {
  return {
    type: modalTypes.SHOW_CONTACT_MODAL,
    payload: actionType
  };
};