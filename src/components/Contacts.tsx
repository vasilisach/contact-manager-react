import * as React from 'react';
import { setModalState, setModalData } from '../redux/modal/modal.actions';
import { db } from '../firebase/firebaseConfig';
import { connect, ConnectedProps } from 'react-redux';
import { updateContactsState } from '../redux/contacts/contacts.actions';
import StartFilledIcon from './icons/star-filled'
import StartBorderedIcon from './icons/start-bordered'
import DeleteIcon from './icons/delete';
import EditIcon from './icons/edit';
import AddIcon from './icons/add';
import EmailIcon from './icons/email';
import PhoneIcon from './icons/phone';
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
    <div className="contacts flex flex-wrap justify-evenly m-3">
      <button
        className="contacts__add-contact absolute bg-gray-500 rounded-full right-2 p-1"
        onClick={() => addContact()}
      >
        <AddIcon />
      </button>
      {userContacts.length > 0 ?
        
          userContacts.map(currentcontact => (
            <div className="card shadow-lg relative w-full md:w-1/2 lg:w-1/4 bg-gray-100 rounded-xl" key={currentcontact.id}>
              <div className="p-6">
                <div className="relative">
                  <img src="new-user.png" className="rounded-full m-auto w-1/3" alt="Contact"></img>
                  {currentcontact.isFavourite ?
                  <button
                    className="contacts__unset-favourite absolute right-0 top-0"
                    onClick={() => unsetFavourite(currentcontact.id)}>
                    <StartFilledIcon />
                  </button>
                  :
                  <button
                    className="contacts__set-favourite absolute right-0 top-0"
                    onClick={() => setFavourite(currentcontact.id)}>
                    <StartBorderedIcon />
                  </button>
                }
                </div>
                
                <div className="text-lg font-bold text-blue-300 text-center p-2">{currentcontact.name}</div>
                <div className="flex items-center py-1">
                  <PhoneIcon />
                  <span className="font-medium text-gray-600 pl-4">{currentcontact.phone}</span>
                </div>
                <div className="flex items-center py-1">
                  <EmailIcon />
                  <span className="font-medium text-gray-600 pl-4">{currentcontact.email}</span>
                </div>
              </div>
              <div className="control flex justify-around border-solid border-3/2 border-gray-500 w-full bg-white p-2">
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
              </div>
            </div>
          ))
        :
        "You haven't contacts yet!"
      }
    </div>
  )
}

export default connector(Contacts);
  