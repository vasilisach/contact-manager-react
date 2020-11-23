import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth } from '../firebase/firebaseConfig';
import { userLoginAction } from '../redux/auth/auth.actions';
import * as CommonTypes from '../types/commonTypes';
import store from '../redux/store';
import * as AuthTypes from '../types/authReducerTypes';
import { connect, ConnectedProps } from 'react-redux';

export async function userLogin(inputLogin: {email: string, password: string}) {
  return await auth.signInWithEmailAndPassword(inputLogin.email, inputLogin.password);
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const mapStateToProps = (state: CommonTypes.RootState) => ({
  currentUser: state.auth.currentUser
})
const mapDispatchToProps = () => ({
  setUserLogin: (data: AuthTypes.LoginInput) => store.dispatch(userLoginAction(data))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Login: React.FC<Props> = ({ setUserLogin }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (email === '' || password === '') {
      setError('Fields are required');
      return;
    }
    setUserLogin({ email, password });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleLogin}                  
          >
            Sign In
          </Button>
          {error && (
            <div className="error" onClick={() => setError('')}>
              {error}
            </div>
          )}
        </form>
      </div>
    </Container>
  );
}

export default connector(Login);