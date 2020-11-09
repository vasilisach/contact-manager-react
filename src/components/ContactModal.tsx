import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { showContactModal } from '../redux/modal/modal.actions';
import { db } from '../firebase/firebaseConfig';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from './icons/close';
import * as RootReducer from '../redux/root.reducer';
import * as ContactTypes from '../types/contactsReducerTypes';

const mapStateToProps = (state:RootReducer.RootState) => ({
  contactData: state.contactModal.showModal
})
const dispatch = useDispatch();

const mapDispatchToProps = () => ({
  showContactModal: (data:ContactTypes.ShowModal) => dispatch(showContactModal(data))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  
const ContactModal:React.FC<Props> = ({ contactData, showContactModal })=>{
  const classes = useStyles();
  const [name, setName] = useState(contactData?.contact?.name || '');
  const [phone, setPhone] = useState(contactData?.contact?.phone || '');
  const [email, setEmail] = useState(contactData?.contact?.email || '');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !phone || !email) {
      setError('Fields are required');
      return;
    }
    
    if (contactData.type === 'add') {
      db.collection('contacts').add(
        {
          name,
          phone,
          email,
          isFavourite: false,
          ownerId: contactData.ownerId
        }
      )
    } 
            
    if (contactData.type === 'edit') {
      db.collection('contacts').doc(contactData.contact.id)
        .update({ name, email, phone })
        .catch((error) => { console.log(error) })
    }

    showContactModal(false);
  }
  
  const closeModal = () => {
    showContactModal(false);
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
          <Alert severity="error" onClick={() => setError('')}>
            {error}
          </Alert>
        )}
      </form>
    </div>
  );
}
  
export default connector(ContactModal);