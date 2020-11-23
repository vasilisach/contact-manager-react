import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect, ConnectedProps } from 'react-redux';
import { setModalState, setModalData } from '../redux/modal/modal.actions';
import { updateContactsState } from '../redux/contacts/contacts.actions';
import { db } from '../firebase/firebaseConfig';
import CloseIcon from './icons/close';
import * as CommonTypes from '../types/commonTypes';
import * as ContactTypes from '../types/contactsReducerTypes';
import store from '../redux/store';

const mapStateToProps = (state: CommonTypes.RootState) => ({
  currentUser: state.auth.currentUser,
  modalState: state.contactModal.modalState,
  modalData:  state.contactModal.modalData
})

const mapDispatchToProps = () => ({
  setModalState: (data: string) => store.dispatch(setModalState(data)),
  setModalData: (data: ContactTypes.Contact | null) => store.dispatch(setModalData(data)),
  updateContacts: ()=>store.dispatch(updateContactsState())
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
  
const ContactModal: React.FC<Props> = ({ currentUser, modalState, setModalState, modalData, setModalData, updateContacts }) => {
  const classes = useStyles();
  const [name, setName] = useState(modalData?.name ||'');
  const [phone, setPhone] = useState(modalData?.phone || '');
  const [email, setEmail] = useState(modalData?.email || '');
  const [error, setError] = useState('');

  const handleSubmit = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!email || !phone || !email) {
      setError('Fields are required');
      return;
    }
    
    if (modalState === 'add') {
      db.collection('contacts').add(
        {
          name,
          phone,
          email,
          isFavourite: false,
          ownerId: currentUser?.uid
        }
      )
        .then(value => { updateContacts() })
        .catch((error) => { console.log(error) })
    } 
            
    if (modalState === 'edit') {
      db.collection('contacts').doc(modalData?.id)
        .update({ name, email, phone })
        .then(value=>{updateContacts()})
        .catch((error) => { console.log(error) })
    }

    setModalState('close')
    setModalData(null);
  }
  
  const closeModal = () => {
    setModalState('close');
    setModalData(null);
  }
      
  return (
    <div className="contact-modal">
      <button
        className="contact-modal__close-modal"
        onClick={closeModal}
      >
        <CloseIcon />
      </button>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}      
        >
          Send
        </Button>
        {error && (
          <div className="error" onClick={() => setError('')}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
}
  
export default connector(ContactModal);