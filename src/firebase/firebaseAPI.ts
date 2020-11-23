import { db } from './firebaseConfig';
import * as ContactsTypes from '../types/contactsReducerTypes';
import store from '../redux/store';

export async function setUserContacts(userId: string) {
  let snapshot = db.collection('contacts').where("ownerId", "==", userId);
  let data = await snapshot.get();
  let userContacts: ContactsTypes.Contact[] = [];
  userContacts = data.docs.map(doc => ({
    id: doc.id,
    email: doc.data().email,
    isFavourite: doc.data().isFavourite,
    name: doc.data().name,
    ownerId: doc.data().ownerId,
    phone: doc.data().phone
  }));
  store.dispatch({ type: 'SET_CONTACTS', payload: userContacts });
  let favouriteContacts = userContacts.filter(contact => contact.isFavourite);
  store.dispatch({ type: 'GET_FAVOURITE_CONTACTS', payload: favouriteContacts });
}