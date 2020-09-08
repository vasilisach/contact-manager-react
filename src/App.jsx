import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import Contacts from './components/Contacts';
import Favourites from './components/Favourites';
import Login from './components/Login';
import ContactModal from './components/ContactModal';
import { setCurrentUser, clearCurrentUser } from './redux/auth/auth.actions';
import { setContacts, getFavouriteContacts } from './redux/contacts/contacts.actions';
import { auth, db } from './firebase/firebaseConfig';

function App({ currentUser, setCurrentUser, clearCurrentUser, showModal, setContacts, getFavouriteContacts }) {
  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        db.collection('contacts').where("ownerId","==",user.uid)
          .onSnapshot(result => {
            let userContacts = result.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setContacts(userContacts);
            let favouriteContacts = userContacts.filter(contact => contact.isFavourite)
            getFavouriteContacts(favouriteContacts)
          })
      } else {
        clearCurrentUser();
        setContacts([])
      }
    });
    
    return () => unsubscribeFromAuth();
  }, [currentUser, setCurrentUser, clearCurrentUser, showModal, setContacts, getFavouriteContacts]);

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          {currentUser ? <Route path="/" exact component={Contacts} /> : null}
          {currentUser ? <Route path="/favourites" exact component={Favourites} />: null}
          {!currentUser ? <Route path="/login" exact component={Login} />: null}
        </Switch>
        { showModal ? <ContactModal /> : null }
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  showModal: state.contactModal.showModal
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  clearCurrentUser: () => dispatch(clearCurrentUser()),
  setContacts: contacts => dispatch(setContacts(contacts)),
  getFavouriteContacts: contacts => dispatch(getFavouriteContacts(contacts))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
