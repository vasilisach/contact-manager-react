export interface User{
  uid: string
};
export interface CurrentUserState{
   currentUser: null | User
};

export interface SetCurrentUser{
  type: string,
  payload: User
};
export interface ClearCurrentUser{
  type: string,
  payload: null
};
export type UserActions = SetCurrentUser | ClearCurrentUser;