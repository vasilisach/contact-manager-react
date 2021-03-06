import React from 'react';
import * as RouterDOM from "react-router-dom";
import './App.css';
import { connect, ConnectedProps } from 'react-redux';
import Navbar from './components/Navbar';
import Contacts from './components/Contacts';
import Favourites from './components/Favourites';
import Login from './components/Login';
import ContactModal from './components/ContactModal';
import { setCurrentUser, clearCurrentUser } from './redux/auth/auth.actions';
import { setContacts, getFavouriteContacts } from './redux/contacts/contacts.actions';
import { auth, db } from './firebase/firebaseConfig';
import * as CommonTypes from './types/commonTypes';
import * as AuthTypes from './types/authReducerTypes';
import * as ContactsTypes from './types/contactsReducerTypes';
import store from './redux/store';

const mapStateToProps = (state: CommonTypes.RootState) => ({
  currentUser: state.auth.currentUser,
  modalState: state.contactModal.modalState
});
const mapDispatchToProps = () => ({
  setCurrentUser: (user:AuthTypes.User) => store.dispatch(setCurrentUser(user)),
  clearCurrentUser: () => store.dispatch(clearCurrentUser()),
  setContacts: (contacts: ContactsTypes.Contact[]) => store.dispatch(setContacts(contacts)),
  getFavouriteContacts: (contacts: ContactsTypes.Contact[]) => store.dispatch(getFavouriteContacts(contacts))
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function App ({ currentUser, setCurrentUser, clearCurrentUser, modalState, setContacts, getFavouriteContacts }:Props){
  React.useEffect(() => {
    let unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        db.collection('contacts').where("ownerId","==",user.uid)
          .onSnapshot(result => {
            let userContacts: ContactsTypes.Contact[] = result.docs.map(doc => ({
              id: doc.id,
              email: doc.data().email,
              isFavourite: doc.data().isFavourite,
              name: doc.data().name,
              ownerId: doc.data().ownerId,
              phone: doc.data().phone
            }));
            setContacts(userContacts);
            let favouriteContacts = userContacts.filter(contact => contact.isFavourite)
            getFavouriteContacts(favouriteContacts)
          })
      } else {
        clearCurrentUser();
        setContacts([]);
      }
    });
    
    return () => unsubscribeFromAuth();
  }, [currentUser, setCurrentUser, clearCurrentUser, modalState, setContacts, getFavouriteContacts]);

  return (
    <RouterDOM.BrowserRouter>
      <div className="container">
        <Navbar />
        <RouterDOM.Switch>
          {currentUser ? <RouterDOM.Route path="/" exact component={Contacts} /> : null}
          {currentUser ? <RouterDOM.Route path="/favourites" exact component={Favourites} />: null}
          {!currentUser ? <RouterDOM.Route path="/login" exact component={Login} />: null}
        </RouterDOM.Switch>
        { (currentUser && modalState!=='close') ? <ContactModal /> : null }
      </div>
    </RouterDOM.BrowserRouter>
  );
}

export default connector(App);
