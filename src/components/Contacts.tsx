import React from 'react';
import { showContactModal } from '../redux/modal/modal.actions';
import { db } from '../firebase/firebaseConfig';
import { connect, useDispatch, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import StartFilledIcon from './icons/star-filled'
import StartBorderedIcon from './icons/start-bordered'
import DeleteIcon from './icons/delete'
import EditIcon from './icons/edit'
import AddIcon from './icons/add'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as Paper from '@material-ui/core/Paper';
import * as RootReducer from '../redux/root.reducer';
import * as ContactsTypes from '../types/contactsReducerTypes';

const mapStateToProps = (state: RootReducer.RootState) => ({
  currentUser: state.auth.currentUser,
  userContacts: state.contacts.userContacts
})
const dispatch = useDispatch();
const mapDispatchToProps = () => ({
  showContactModal: (data: ContactsTypes.ShowModal) => dispatch(showContactModal(data))
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  userContacts: ContactsTypes.Contact[]
};

const useStyles = makeStyles({
  table: {
    minWidth: 400,
  },
});

const Contacts: React.FC<Props> = ({ currentUser, userContacts, showContactModal })=>{

  const classes = useStyles();

  const deleteContact = (id:string) => {
    if (id) {
      db.collection('contacts').doc(id).delete()
        .then(function () {
          console.log('Document successfully deleted!');
        })
        .catch(function (error) {
          console.error(`Error removing document: ${error}`);
        }); 
    }
  };

  const editContact = (contact: ContactsTypes.Contact) => {
    showContactModal({ type: 'edit', contact });
  }

  const addContact = () => {
    if (currentUser) {
      showContactModal({ type: 'add', ownerId: currentUser.uid }); 
    }
  };

  const setFavourite = (id: string) => {
    if (id) {
      db.collection('contacts').doc(id).update({'isFavourite': true}) 
    }
  }

  const unsetFavourite = (id: string) => {
    if (id) {
      db.collection('contacts').doc(id).update({'isFavourite': false}) 
    }
  }
    
  return (
    <div className="contacts">
      <h3 className="contacts__header">Contacts</h3>
      <button
        className="contacts__add-contact"
        onClick={() => addContact()}
      >
        <AddIcon />
      </button>
      
      {userContacts.length > 0 ?
        <TableContainer component={Paper} width="70%">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Favourite</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userContacts.map(currentcontact => (
                <TableRow key={currentcontact.id}>
                  <TableCell>
                    {currentcontact.isFavourite ?
                      <button
                        className="contacts__unset-favourite"
                        onClick={() => unsetFavourite(currentcontact.id)}>
                        <StartFilledIcon />
                      </button>
                      :
                      <button
                        className="contacts__set-favourite"
                        onClick={() => setFavourite(currentcontact.id)}>
                        <StartBorderedIcon />
                      </button>
                    }
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">{currentcontact.name}</TableCell>
                  <TableCell align="right">{currentcontact.phone}</TableCell>
                  <TableCell align="right">{currentcontact.email}</TableCell>
                  <TableCell align="right">
                    <button
                      className="contacts__delete-contact"
                      onClick={() => deleteContact(currentcontact.id)}
                    >
                      <DeleteIcon />
                    </button>
                    <button
                      className="contacts__edit-contact"
                      onClick={() => editContact(currentcontact)}
                    >
                      <EditIcon />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        :
        "You haven't contacts yet!"
      }
    </div>
  )
}

export default connector(Contacts);
  