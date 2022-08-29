import { createSlice } from "@reduxjs/toolkit";

const upperStripReducer = createSlice({
  name: "upperStripRates",
  initialState: {
    isLoading: false,
    rates: {},
    errorMsg: "",
  },

  reducers: {
    getRatesSaga: (state, action) => {
      return { ...state };
    },

    getRatesStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    getRatesSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        rates: action.payload,
      };
    },
    getRatesFail: (state, action) => {
      return {
        ...state,
        rates: {},
        isLoading: false,
        errorMsg: action.payload,
      };
    },
  },
});

export const { getRatesSaga, getRatesStart, getRatesSuccess, getRatesFail } =
  upperStripReducer.actions;
export default upperStripReducer.reducer;
