import { all } from 'redux-saga/effects';
import { loginWhatcher } from './login.saga';
import { updateWhatcher } from './update.saga';

export default function* rootSaga() {
  yield all([
    loginWhatcher(),
    updateWhatcher()
  ])
}