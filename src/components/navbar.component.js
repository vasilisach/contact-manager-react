import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { connect } from 'react-redux';

const Navbar = ({ currentUser }) => {
  const history = useHistory();

  const handleSignOut = () => {
    auth.signOut();
    history.push('/login');
  }

  return (
    <div className="nav-bar">
      {currentUser ? (
        <div className="nav-bar__nav-content">
          <div className="nav-bar__nav-left">
            <Link to='/' className="nav-bar__nav-link">Contacts</Link>
            <Link to='/favourites' className="nav-bar__nav-link">Favourites</Link>
          </div>
          <div color="inherit" className="nav-bar__signout-btn" onClick={handleSignOut}>Sign out</div>
        </div>
      ) : (
        <Link to='/login' className="nav-bar__login-btn">Login</Link>
      )
      }
    </div>
  );
};
  
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});
  
export default connect(
  mapStateToProps,
  null
)(Navbar);