import { select, put, takeLatest } from 'redux-saga/effects';
import { userLogin } from '../../components/Login';
import { setUserContacts } from '../../firebase/firebaseAPI';

export function* loginSaga() {
  try {
    const state = yield select();
    let currentUser = yield userLogin(state.auth.inputParams);
    if (currentUser) {
      yield put({ type: 'SET_CURRENT_USER', payload: currentUser.user });
      yield setUserContacts(currentUser.user.uid);
    }
  } catch (error) {
    console.log(error)
  }
}

export function* loginWhatcher() {
  yield takeLatest('USER_LOGIN', loginSaga)
}