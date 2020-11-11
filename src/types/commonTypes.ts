import * as ContactTypes from './contactsReducerTypes';
import * as AuthTypes from './authReducerTypes';

export type RootState = {
  auth: AuthTypes.CurrentUserState,
  contacts: ContactTypes.ContactsState,
  contactModal: ContactTypes.ModalState
}