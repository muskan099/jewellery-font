import { createSlice } from "@reduxjs/toolkit";

const dashboardReducer = createSlice({
  name: "userDashboard",
  initialState: {
    isLoading: false,
    data: {},
    errorMsg: "",
  },

  reducers: {
    getDashboardSaga: (state, action) => {
      return { ...state };
    },

    getDashboardStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    getDashboardSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    },
    getDashboardFail: (state, action) => {
      return {
        ...state,
        data: {},
        isLoading: false,
        errorMsg: action.payload,
      };
    },
  },
});

export const {
  getDashboardSaga,
  getDashboardStart,
  getDashboardSuccess,
  getDashboardFail,
} = dashboardReducer.actions;
export default dashboardReducer.reducer;
