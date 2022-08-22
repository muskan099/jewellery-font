import { put, call } from "redux-saga/effects";
import axios from "../../../http/axios/axios_main";
import { catchHandler } from "../helperSaga";

import {
  getRatesStart,
  getRatesSuccess,
  getRatesFail,
} from "../../reducers/upperStripRateReducer";

export function* ratesSaga(action) {
  yield put(getRatesStart());
  try {
    const response = yield axios.get(`/users/get-rates`);
    if (response.status === 200) {
      yield put(getRatesSuccess(response.data.data));
    } else {
      yield put(getRatesFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, getRatesFail);
  }
}
