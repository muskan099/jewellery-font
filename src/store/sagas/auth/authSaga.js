import { put, call } from "redux-saga/effects";
import axios from "../../../http/axios/axios_main";
import { catchHandler } from "../helperSaga";

import {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFail,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFail,
  passwordResetStart,
  passwordResetSuccess,
  passwordResetFail,
  userLoginStart,
  userloginSuccess,
  userLoginFail,
} from "../../reducers/authReducer";
import { toast } from "react-toastify";

function* setItemToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

// @ note := THis login saga is for connecting the wallet ,
// and not for login the user through API Call
export function* loginSaga(action) {
  yield put(loginStart());
  try {
    const { address, balance, tabooPunk, tier } = action.payload;
    if (address) {
      yield call(setItemToLocalStorage, "isAuthenticated", true);
      yield call(setItemToLocalStorage, "walletAddress", address);
      yield call(setItemToLocalStorage, "balance", balance);
      yield call(setItemToLocalStorage, "tabooPunk", tabooPunk);

      yield call(setItemToLocalStorage, "tier", tier);

      yield put(
        loginSuccess({
          address: address,
          balance: balance,
          tabooPunk: tabooPunk,
          tier: tier,
        })
      );
    } else {
      yield put(loginFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, loginFail);
  }
}

// @ note := THis login saga is for login the user through API Call

export function* userLoginSaga(action) {
  console.log("action", action);
  yield put(userLoginStart());
  try {
    console.log("action.payload", action.payload);
    const { inputdata, navigate } = action.payload;
    console.log("inputData", inputdata);
    const response = yield axios.post(`/AdminSingin`, inputdata);
    console.log(response.data);
    if (response?.data.status) {
      yield call(
        setItemToLocalStorage,
        "userRole",
        response.data.user.user_role
      );
      yield call(setItemToLocalStorage, "isUserAuthenticated", true);
      yield call(
        setItemToLocalStorage,
        "userData",
        JSON.stringify(response.data.user)
      );
      yield put(userloginSuccess(response.data.user));
      if (response.data.user.user_role === "admin") {
        navigate("/create-nft");
      }
    } else {
      toast.error(response.data.message);
      yield put(userLoginFail(response.data.message));
    }
  } catch (error) {
    yield call(catchHandler, error, userLoginFail);
  }
}
export function* registerSaga(action) {
  yield put(registerStart());
  try {
    const response = yield axios.post(`/users/signup`, action.payload);
    console.log(response);
    if (response.status === 200) {
      console.log(response.data.data);
      yield call(
        [localStorage, "setItem"],
        "authToken",
        response.data.data.loginObj.token
      );
      yield call(
        [localStorage, "setItem"],
        "userRole",
        response.data.data.loginObj.user_role
      );
      yield call(
        [localStorage, "setItem"],
        "userData",
        JSON.stringify(response.data.data.loginObj)
      );
      yield call(
        setItemToLocalStorage,
        "kycStatus",
        JSON.stringify(response.data.data.kycstatus)
      );
      yield put(registerSuccess(response.data.data));
      window.location.pathname = "/dashboard";
    } else {
      yield put(registerFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, registerFail);
  }
}

export function* googleLoginSaga(action) {
  yield put(loginStart());
  try {
    console.log(action.payload);
    const response = yield axios.post(`/users/login-google`, action.payload);
    if (response.status === 200) {
      yield call(
        setItemToLocalStorage,
        "authToken",
        response.data.data.loginObj.token
      );
      yield call(
        setItemToLocalStorage,
        "userRole",
        response.data.data.loginObj.user_role
      );
      yield call(
        setItemToLocalStorage,
        "userData",
        JSON.stringify(response.data.data.loginObj)
      );
      yield call(
        setItemToLocalStorage,
        "kycStatus",
        JSON.stringify(response.data.data.kycstatus)
      );
      yield put(loginSuccess(response.data.data));
      window.location.pathname = "/dashboard";
    } else {
      yield put(loginFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    yield call(catchHandler, error, loginFail);
  }
}

export function* forgotPasswordSaga(action) {
  yield put(forgotPasswordStart());
  const { email, stopSpinner } = action.payload;
  try {
    const response = yield axios.post(`/users/forgot-password`, { email });
    if (response.status === 200) {
      yield put(forgotPasswordSuccess(response.data.data));
      stopSpinner();
    } else {
      stopSpinner();
      yield put(forgotPasswordFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    stopSpinner();
    yield call(catchHandler, error, forgotPasswordFail);
  }
}

export function* verifyOtpSaga(action) {
  yield put(verifyOtpStart());
  const { email, stopSpinner, otp } = action.payload;
  try {
    const response = yield axios.post(`/users/verify-otp`, { email, otp });
    if (response.status === 200) {
      yield put(verifyOtpSuccess(response.data.data));
      stopSpinner();
    } else {
      stopSpinner();
      yield put(verifyOtpFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    stopSpinner();
    yield call(catchHandler, error, verifyOtpFail);
  }
}

export function* passwordResetSaga(action) {
  yield put(passwordResetStart());
  const { email, stopSpinner, password } = action.payload;
  try {
    const response = yield axios.post(`/users/reset-password`, {
      email,
      password,
    });
    if (response.status === 200) {
      yield put(passwordResetSuccess(response.data.data));
      stopSpinner();
    } else {
      stopSpinner();
      yield put(passwordResetFail("Something went wrong! Please try again."));
    }
  } catch (error) {
    stopSpinner();
    yield call(catchHandler, error, passwordResetFail);
  }
}
