import { createSlice } from "@reduxjs/toolkit";

const nftReducer = createSlice({
  name: "nft",
  initialState: {
    isLoading: false,
    nft: [],
    nftDetail: {},
    errorMsg: "",
    totalNfts: 0,
  },

  reducers: {
    getNftSaga: (state, action) => {
      return { ...state };
    },

    getNftStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    getNftSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        nft: action.payload.data,
        totalNfts: action.payload?.total || 0,
      };
    },
    getNftFail: (state, action) => {
      return {
        ...state,
        nft: [],
        isLoading: false,
        errorMsg: action.payload,
        totalNfts: 0,
      };
    },

    createNftSaga: (state, action) => {
      return { ...state };
    },

    createNftStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    createNftSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        isCreated: true,
        nft: action.payload,
        errorMsg: "",
      };
    },

    createNftFail: (state) => {
      return {
        ...state,
        isLoading: false,
      };
    },

    getNftDetailSaga: (state, action) => {
      return { ...state };
    },

    getNftDetailStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    getNftDetailSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        nftDetail: action.payload,
      };
    },
    getNftDetailFail: (state, action) => {
      return {
        ...state,
        nftDetail: {},
        isLoading: false,
        errorMsg: action.payload,
      };
    },

    clearNftDetail: (state) => {
      return { ...state, nftDetail: {} };
    },

    updateNftStatusSaga: (state, action) => {
      return { ...state };
    },

    updateNftStatusStart: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },

    updateNftStatusSuccess: (state, action) => {
      return {
        ...state,
        isLoading: false,
        nft: action.payload,
      };
    },
    updateNftStatusFail: (state, action) => {
      return {
        ...state,
        nft: {},
        isLoading: false,
        errorMsg: action.payload,
      };
    },
  },
});

export const {
  getNftSaga,
  getNftStart,
  getNftSuccess,
  getNftFail,

  createNftSaga,
  createNftStart,
  createNftSuccess,
  createNftFail,

  getNftDetailFail,
  getNftDetailSaga,
  getNftDetailStart,
  getNftDetailSuccess,
  clearNftDetail,

  updateNftStatusSaga,
  updateNftStatusStart,
  updateNftStatusSuccess,
  updateNftStatusFail,
} = nftReducer.actions;
export default nftReducer.reducer;
