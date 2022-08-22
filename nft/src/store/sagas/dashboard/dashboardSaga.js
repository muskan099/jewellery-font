import { put, call } from "redux-saga/effects";
import axios from "../../../http/axios/axios_main";
import { catchHandler } from "../helperSaga";

import {
  getDashboardStart,
  getDashboardSuccess,
  getDashboardFail,
} from "../../reducers/dashboardReducer";

export function* getDashboardSaga(action) {
  yield put(getDashboardStart());
  try {
    const response = yield axios.post(`/users/dashboard`, action.payload);
    if (response.status === 200) {
      yield put(getDashboardSuccess(response.data.data));
    } else {
      yield put(getDashboardFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, getDashboardFail);
  }
}
