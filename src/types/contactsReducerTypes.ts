export interface Contact{
  id: string,
  email: string,
  isFavourite: boolean,
  name: string,
  ownerId: string,
  phone: string
};
export interface ContactsState{
  userContacts: [] | Contact[],
  favouriteContacts: [] | Contact[]
};
export interface ContactsActions{
  type: string,
  payload: Contact[]
};
export interface EditContact{
  type: string,
  contact: Contact
};
export interface AddContacts{
  type: string,
  ownerId: string
};

export type ShowModal = boolean | EditContact | AddContacts;
export interface ShowModalActions{
  type: string,
  payload: ShowModal
};
export interface ShowModalState{
  showModal: ShowModal
};