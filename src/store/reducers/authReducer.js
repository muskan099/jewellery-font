import { createSlice } from "@reduxjs/toolkit";

const hasWebsiteAccess = localStorage.getItem("hasWebsiteAccess");
const isAuthenticated = localStorage.getItem("isAuthenticated");
const isUserAuthenticated = localStorage.getItem("isUserAuthenticated");
const userRole = localStorage.getItem("userRole");
const userData = localStorage.getItem("userData");
const walletAddress = localStorage.getItem("walletAddress");
const balance = localStorage.getItem("balance");
const tabooPunk = localStorage.getItem("tabooPunk");
const tier = localStorage.getItem("tier");
const metaMaskWallet = localStorage.getItem("metaMaskWallet");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    walletAddress: !!walletAddress ? walletAddress : "",
    value: { user: {}, isAuthenticated: false },
    hasWebsiteAccess: hasWebsiteAccess ? Boolean(hasWebsiteAccess) : false,
    isAuthenticated: !!isAuthenticated ? true : false,
    isUserAuthenticated: !!isUserAuthenticated ? true : false,
    userRole: !!userRole ? userRole : "",
    user: !!userData ? JSON.parse(userData) : {},
    authToken: "",
    balance: !!balance > 0 ? balance : "",
    errorMsg: "",
    tier: !!tier ? tier : "",
    metaMaskWallet: !!metaMaskWallet ? metaMaskWallet : "",
    isChangeNetwork: "97",
    isChangeContract: "BNB",
  },

  reducers: {

    grantWebsiteAccessAction: (state) => ({ ...state, hasWebsiteAccess: true }),

    changenetwork: (state,action) => {
      console.log();
      return {
        ...state,
        isChangeNetwork : action.payload.isChangeNetwork
      }
    },

    changecontract: (state,action) => {
      console.log();
      return {
        ...state,
        isChangeContract : action.payload.isChangeContract
      }
    },
    loginSaga: (state, action) => {
      return { ...state };
    },
    
    googleLoginSaga: (state, action) => {
      return { ...state };
    },
    setmetaMaskWallet: (state, action) => {
      localStorage.setItem("metaMaskWallet", action.payload);
      return { ...state, metaMaskWallet: action.payload };
    },
    userLoginSaga: (state, action) => {
      return { ...state };
    },
    userLoginStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    userloginSuccess: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: true,
        user: action.payload,
        userRole: action.payload.user_role,
      };
    },

    userLoginFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isUserAuthenticated: false,
        user: {},
        errorMsg: action.payload,
      };
    },

    loginStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    loginSuccess: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        walletAddress: action.payload.address,
        balance: action.payload.balance,
        tabooPunk: action.payload.tabooPunk,
        tier: action.payload.tier,
        isAuthenticated: true,
        errorMsg: "",
      };
    },
    loginFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errorMsg: action.payload,
      };
    },
    logout: (state) => {
      localStorage.clear();
      return {
        ...state,
        isLoading: false,
        walletAddress: "",
        tabooPunk: "",
        balance: "",
        isAuthenticated: false,
        errorMsg: "",
      };
    },

    registerSaga: (state, action) => {
      return { ...state };
    },

    registerStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    registerSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        kycStatus: action.payload.kycstatus,
        authToken: action.payload.loginObj.token,
        user: action.payload.loginObj,
        isRegistered: true,
        errorMsg: "",
      };
    },
    registerFail: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: {},
        errorMsg: action.payload,
        isRegistered: false,
      };
    },

    changeKYCStatus: (state, action) => {
      localStorage.setItem("kycStatus", true);
      return {
        ...state,
        kycStatus: true,
      };
    },

    setWalletAddress: (state, action) => {
      localStorage.setItem("walletAddress", action.payload);
      return {
        ...state,
        walletAddress: action.payload,
      };
    },

    forgotPasswordSaga: (state) => {
      return {
        ...state,
      };
    },
    forgotPasswordStart: (state, action) => {
      return {
        ...state,
        isLoading: true,
        errorMsg: "",
      };
    },
    forgotPasswordSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isForgotPasswordSuccess: true,
        errorMsg: "",
      };
    },
    forgotPasswordFail: (state, action) => {
      return {
        ...state,
        errorMsg: action.payload,
        isLoading: false,
      };
    },

    verifyOtpSaga: (state) => {
      return {
        ...state,
      };
    },
    verifyOtpStart: (state, action) => {
      return {
        ...state,
        isLoading: true,
        errorMsg: "",
      };
    },
    verifyOtpSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        errorMsg: "",
        isOTPValid: true,
      };
    },
    verifyOtpFail: (state, action) => {
      return {
        ...state,
        errorMsg: action.payload,
        isLoading: false,
        isOTPValid: false,
      };
    },
    passwordResetSaga: (state) => {
      return {
        ...state,
      };
    },
    passwordResetStart: (state, action) => {
      return {
        ...state,
        isLoading: true,
        errorMsg: "",
      };
    },
    passwordResetSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        errorMsg: "",
        passwordResetSuccess: true,
      };
    },
    passwordResetFail: (state, action) => {
      return {
        ...state,
        errorMsg: action.payload,
        isLoading: false,
        passwordResetSuccess: false,
      };
    },
  },
});

export const {
  grantWebsiteAccessAction,
  googleLoginSaga,
  loginSaga,
  loginStart,
  loginSuccess,
  loginFail,
  logout,
  registerSaga,
  registerSuccess,
  registerStart,
  registerFail,

  changeKYCStatus,
  setWalletAddress,

  forgotPasswordSaga,
  forgotPasswordStart,
  forgotPasswordSuccess,
  forgotPasswordFail,

  verifyOtpSaga,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFail,
  setmetaMaskWallet,
  passwordResetSaga,
  passwordResetStart,
  passwordResetSuccess,
  passwordResetFail,
  changecontract,
  changenetwork,
  userLoginSaga,
  userLoginStart,
  userloginSuccess,
  userLoginFail,
} = authSlice.actions;

export default authSlice.reducer;
