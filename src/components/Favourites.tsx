import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as RootReducer from '../redux/root.reducer';
import * as ContactTypes from '../types/contactsReducerTypes';

const mapStateToProps = (state:RootReducer.RootState) => ({
  favouriteContacts: state.contacts.favouriteContacts
})
const connector = connect(mapStateToProps, null);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  favouriteContacts: ContactTypes.Contact[]
};

const Favourites:React.FC<Props> = ({ favouriteContacts }) => {
  const classes = useStyles();
    
  return (
    <div className="favourites">
      <h3 className="favourites__header">Favourites</h3>
      {favouriteContacts.length > 0 ?
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favouriteContacts.map(currentcontact => (
                <TableRow key={currentcontact.phone}>
                  <TableCell component="th" scope="row">{currentcontact.name}</TableCell>
                  <TableCell align="right">{currentcontact.phone}</TableCell>
                  <TableCell align="right">{currentcontact.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        :
        "You haven't  favourite contacts yet!"
      }
    </div>
  )
}
  
export default connector(Favourites);
  