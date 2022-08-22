import { put, call } from "redux-saga/effects";
import axios from "../../../http/axios/axios_main";
import { catchHandler } from "../helperSaga";

import {
  getTransactionsStart,
  getTransactionsSuccess,
  getTransactionsFail,
  createTransactionsStart,
  createTransactionsSuccess,
  createTransactionsFail,
} from "../../reducers/transactionReducer";


function* setItemToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function* getTransactionsSaga(action) {
  yield put(getTransactionsStart());
  try {
    const response = yield axios.post(`/users/Transactions`, action.payload);
    if (response.status === 200) {
      yield put(getTransactionsSuccess(response.data.data));
    } else {
      yield put(getTransactionsFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, getTransactionsFail);
  }
}


export function* createTransactionsSaga(action) {
  yield put(createTransactionsStart());
  try {
    const response = yield axios.post(`/make-order`, action.payload);
    if (response.status === 200) {
      yield call(setItemToLocalStorage, "transactions",response.data);

      yield put(createTransactionsSuccess(response.data));
    } else {
      yield put(createTransactionsFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error,createTransactionsFail);
  }
}
