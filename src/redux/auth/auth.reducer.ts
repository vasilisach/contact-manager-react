import authTypes from './auth.types';
import * as allAuthTypes from '../../types/authReducerTypes';

const initialState: allAuthTypes.CurrentUserState = {
  currentUser: null,
  inputParams: null
};

const authReducer = (state = initialState, action: allAuthTypes.UserActions) => {
  switch (action.type) {
    case authTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
  
    case authTypes.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    
    case authTypes.USER_LOGIN:
      return {
        ...state,
        inputParams: action.payload
      };
  
    default:
      return state;
  }
};

export default authReducer;