import { createSlice } from "@reduxjs/toolkit";
const transactions=localStorage.getItem('transactions')

const transactionsReducer = createSlice({
  name: "transactions",
  initialState: {
    isLoading: false,
    transactions:!!transactions?transactions : "",
    errorMsg: "",
  },

  reducers: {
    getTransactionsSaga: (state, action) => {
      return { ...state };
    },

    getTransactionsStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    getTransactionsSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        transactions: action.payload,
      };
    },
    getTransactionsFail: (state, action) => {
      return {
        ...state,
        transactions: [],
        isLoading: false,
        errorMsg: action.payload,
      };
    },



    createTransactionsSaga: (state, action) => {
      return { ...state };
    },

    createTransactionsStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    createTransactionsSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        transactions: action.payload,
      };
    },
    createTransactionsFail: (state, action) => {
      return {
        ...state,
        transactions: [],
        isLoading: false,
        errorMsg: action.payload,
      };
    },


  },
});

export const {
  getTransactionsSaga,
  getTransactionsStart,
  getTransactionsSuccess,
  getTransactionsFail,
  createTransactionsSaga,
  createTransactionsStart,
  createTransactionsSuccess,
  createTransactionsFail,
} = transactionsReducer.actions;
export default transactionsReducer.reducer;
