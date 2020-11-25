import React from 'react';
import * as RouterDOM from "react-router-dom";
import { connect, ConnectedProps } from 'react-redux';
import Navbar from './components/Navbar';
import Contacts from './components/Contacts';
import Favourites from './components/Favourites';
import Login from './components/Login';
import ContactModal from './components/ContactModal';
import { setCurrentUser, clearCurrentUser } from './redux/auth/auth.actions';
import { setContacts, getFavouriteContacts } from './redux/contacts/contacts.actions';
import { auth } from './firebase/firebaseConfig';
import * as CommonTypes from './types/commonTypes';
import * as AuthTypes from './types/authReducerTypes';
import * as ContactsTypes from './types/contactsReducerTypes';
import { setUserContacts } from './firebase/firebaseAPI';
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

function App({ currentUser, modalState, setCurrentUser, clearCurrentUser }: Props) {
  React.useEffect(() => { 
    let unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setUserContacts(user.uid);
      } else {
        clearCurrentUser();
        setContacts([]);
      }
    })
    return () => unsubscribeFromAuth();
  },[currentUser, clearCurrentUser, setCurrentUser])
  return (
    <RouterDOM.BrowserRouter>
      <div className="">
        <Navbar />
        <RouterDOM.Switch>
          {currentUser ? <RouterDOM.Route path="/" exact component={Contacts} /> : null}
          {currentUser ? <RouterDOM.Route path="/favourites" exact component={Favourites} />: null}
          {!currentUser ? <RouterDOM.Route path="/login" exact component={Login} />: <RouterDOM.Redirect to="/" />}
        </RouterDOM.Switch>
        { (currentUser && modalState!=='close') ? <ContactModal /> : null }
      </div>
    </RouterDOM.BrowserRouter>
  );
}

export default connector(App);
