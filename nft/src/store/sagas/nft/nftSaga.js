import { put, call } from "redux-saga/effects";
import axios from "../../../http/axios/axios_main";
import { catchHandler } from "../helperSaga";

import {
  getNftStart,
  getNftSuccess,
  getNftFail,
  createNftStart,
  createNftSuccess,
  createNftFail,
  getNftDetailStart,
  getNftDetailFail,
  getNftDetailSuccess,
  updateNftStatusFail,
  updateNftStatusSuccess,
  updateNftStatusStart,
} from "../../reducers/nftReducer";

export function* getNftSaga(action) {
  yield put(getNftStart());
  try {
    const response = yield axios.post(`/explore-content`, action.payload);
    if (response.status === 200) {
      yield put(getNftSuccess(response.data));
    } else {
      yield put(getNftFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, getNftFail);
  }
}

export function* createNftSaga(action) {
  yield put(createNftStart());
  try {
    const response = yield axios.post(`/create-content`, action.payload);
    if (response.status === 200) {
      yield put(createNftSuccess(response.data.data));
    } else {
      yield put(createNftFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, createNftFail);
  }
}

export function* getNftDetailSaga(action) {
  yield put(getNftDetailStart());
  try {
    const response = yield axios.post(`/content-detail`, action.payload);
    if (response.status === 200) {
      console.log(response.data);

      yield put(getNftDetailSuccess(response.data));
    } else {
      yield put(getNftDetailFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, getNftDetailFail);
  }
}

export function* updateNftStatusSaga(action) {
  yield put(updateNftStatusStart());
  try {
    const response = yield axios.post(`/content-status`, action.payload);
    if (response.status === 200) {
      console.log(response.data);

      yield put(updateNftStatusSuccess(response.data));
    } else {
      yield put(updateNftStatusFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, updateNftStatusFail);
  }
}
