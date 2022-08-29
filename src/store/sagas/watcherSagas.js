import { all, takeLatest } from "redux-saga/effects";

// uncomment when actions grow largee
// import * as action from "../reducers/actionLabels/reducerActionLabels";

import {
  forgotPasswordSaga,
  googleLoginSaga,
  loginSaga,
  passwordResetSaga,
  registerSaga,
  userLoginSaga,
  verifyOtpSaga,
} from "./auth/authSaga";
import { ratesSaga } from "./upperStripRate/rate";
import {
  getTransactionsSaga,
  createTransactionsSaga,
} from "./transactions/transactionSaga";
import { getDashboardSaga } from "./dashboard/dashboardSaga";

import {
  getNftSaga,
  createNftSaga,
  getNftDetailSaga,
  updateNftStatusSaga,
} from "./nft/nftSaga";

// tmep
// console.log(action.getRatesSaga.type);
// console.log(action.loginSaga.type);

export function* watchDashboard() {
  yield all([takeLatest("userDashboard/getDashboardSaga", getDashboardSaga)]);
}

export function* watchAuthentication() {
  yield all([takeLatest("auth/loginSaga", loginSaga)]);
  yield all([takeLatest("auth/userLoginSaga", userLoginSaga)]);
  yield all([takeLatest("auth/googleLoginSaga", googleLoginSaga)]);
  yield all([takeLatest("auth/registerSaga", registerSaga)]);
  yield all([takeLatest("auth/forgotPasswordSaga", forgotPasswordSaga)]);
  yield all([takeLatest("auth/verifyOtpSaga", verifyOtpSaga)]);
  yield all([takeLatest("auth/passwordResetSaga", passwordResetSaga)]);
  yield all([takeLatest("nft/getNftSaga", getNftSaga)]);
  yield all([takeLatest("nft/createNftSaga", createNftSaga)]);
  yield all([takeLatest("nft/getNftDetailSaga", getNftDetailSaga)]);

  yield all([takeLatest("nft/updateNftStatusSaga", updateNftStatusSaga)]);
}
export function* watchRates() {
  yield all([takeLatest("upperStripRates/getRatesSaga", ratesSaga)]);
}
export function* watchTransactions() {
  yield all([
    takeLatest("transactions/getTransactionsSaga", getTransactionsSaga),
    takeLatest("transactions/createTransactionsSaga", createTransactionsSaga),
  ]);
}
