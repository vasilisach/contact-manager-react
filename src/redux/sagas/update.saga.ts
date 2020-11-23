import { select, takeEvery } from 'redux-saga/effects';
import { setUserContacts } from '../../firebase/firebaseAPI';

export function* update() {
  const state = yield select();
  if (state.auth.currentUser.uid) {
    yield setUserContacts(state.auth.currentUser.uid);
  }
}

export function* updateWhatcher() {
  yield takeEvery('UPDATE_CONTACTS', update)
}