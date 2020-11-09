import authTypes from './auth.types';
import * as allAuthTypes from '../../types/authReducerTypes';

export const setCurrentUser = (user: allAuthTypes.User) : allAuthTypes.SetCurrentUser => {
  return {
    type: authTypes.SET_CURRENT_USER,
    payload: user
  };
};

export const clearCurrentUser = () : allAuthTypes.ClearCurrentUser => ({
  type: authTypes.CLEAR_CURRENT_USER,
  payload: null
});