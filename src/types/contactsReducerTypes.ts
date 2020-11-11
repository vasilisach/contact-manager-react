export interface Contact{
  id: string,
  email: string,
  isFavourite: boolean,
  name: string,
  ownerId: string,
  phone: string
};
export interface ContactsState{
  userContacts: Contact[],
  favouriteContacts: Contact[]
};
export interface ContactsActions{
  type: string,
  payload: Contact[]
};

export interface ShowModalActions{
  type: string,
  payload: string | Contact | undefined
};
export interface ModalState{
  modalState: string,
  modalData: Contact | null
};