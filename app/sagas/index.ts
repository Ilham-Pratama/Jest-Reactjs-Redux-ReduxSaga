import { takeLatest, all, put, call } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import 'babel-polyfill';
import { SET, SET_ERROR } from '../actions/data';

export const url = 'https://jsonplaceholder.typicode.com/users';

export function* axiosGet() {
  const res = yield axios
    .get(url)
    .then(resp => resp)
    .catch(err => err);
  yield fetchSource(res);
}

export function* fetchSource(data) {
  if (!data || !data.status) {
    return yield put(SET_ERROR(data));
  }
  yield put(SET(data));
}

export function* actionWatcher() {
  yield takeLatest('CALL', axiosGet);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
