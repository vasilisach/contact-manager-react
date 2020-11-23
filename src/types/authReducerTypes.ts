export interface User{
  uid: string
};
export interface LoginInput {
  email: string, 
  password: string
}
export interface CurrentUserState{
  currentUser: null | User,
  inputParams: null | LoginInput
};

export interface LoginInputFunc{
  type: string,
  payload: null | LoginInput
}

export interface SetCurrentUser{
  type: string,
  payload: User
};
export interface ClearCurrentUser{
  type: string,
  payload: null
};
export type UserActions = SetCurrentUser | ClearCurrentUser | LoginInputFunc;