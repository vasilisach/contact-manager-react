import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { connect, ConnectedProps } from 'react-redux';
import * as CommonTypes from '../types/commonTypes';

const mapStateToProps = (state: CommonTypes.RootState) => ({
  currentUser: state.auth.currentUser
});
const connector = connect(
  mapStateToProps,
  null
);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Navbar: React.FC<Props> = ({ currentUser }) => {
  const history = useHistory();
  const handleSignOut = () => {
    auth.signOut();
    history.push('/login');
  }

  return (
    <div className="nav-bar bg-gray-600 p-6 text-white text-lg font-medium">
      {currentUser ? (
        <div className="nav-bar__nav-content flex justify-between">
          <div className="nav-bar__nav-left">
            <Link to='/' className="nav-bar__nav-link px-3 cursor-pointer hover:underline">Contacts</Link>
            <Link to='/favourites' className="nav-bar__nav-link px-3 cursor-pointer hover:underline">Favourites</Link>
          </div>
          <div
            color="inherit"
            className="nav-bar__signout-btn cursor-pointer"
            onClick={handleSignOut}
          >
            Sign out
          </div>
        </div>
      ) : (
        <Link to='/login' className="nav-bar__login-btn flex justify-end">Login</Link>
      )
      }
    </div>
  );
}
  
export default connector(Navbar);