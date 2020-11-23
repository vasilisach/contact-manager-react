import * as React from 'react';
import { setModalState, setModalData } from '../redux/modal/modal.actions';
import { db } from '../firebase/firebaseConfig';
import { connect, ConnectedProps } from 'react-redux';
import { updateContactsState } from '../redux/contacts/contacts.actions';
import StartFilledIcon from './icons/star-filled'
import StartBorderedIcon from './icons/start-bordered'
import DeleteIcon from './icons/delete'
import EditIcon from './icons/edit'
import AddIcon from './icons/add'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import * as CommonTypes from '../types/commonTypes';
import * as ContactsTypes from '../types/contactsReducerTypes';
import store from '../redux/store';

const mapStateToProps = (state: CommonTypes.RootState) => ({
  currentUser: state.auth.currentUser,
  userContacts: state.contacts.userContacts
})
const mapDispatchToProps = () => ({
  setModalState: (data: string) => store.dispatch(setModalState(data)),
  setModalData: (data: ContactsTypes.Contact | null) => store.dispatch(setModalData(data)),
  updateContacts: ()=>store.dispatch(updateContactsState())
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;


const Contacts: React.FC<Props> = ({ currentUser, userContacts, setModalState, setModalData, updateContacts })=>{

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
    setModalState('edit');
    setModalData(contact);
  }

  const addContact = () => {
    if (currentUser) {
      setModalState('add');
    }
  };

  const setFavourite = (id: string) => {
    if (id) {
      db.collection('contacts').doc(id).update({ 'isFavourite': true })
      .then(value=>{updateContacts()})
    }
  }

  const unsetFavourite = (id: string) => {
    if (id) {
      db.collection('contacts').doc(id).update({ 'isFavourite': false })
      .then(value=>{updateContacts()})
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
          <Table aria-label="simple table">
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
        :
        "You haven't contacts yet!"
      }
    </div>
  )
}

export default connector(Contacts);
  