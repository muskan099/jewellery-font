import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import upperStripRateReducer from "./reducers/upperStripRateReducer";
import transactionReducer from "./reducers/transactionReducer";
import dashboardReducer from "./reducers/dashboardReducer";
import nftReducer from "./reducers/nftReducer";
import createSagaMiddleWare from "redux-saga";
import {
  watchAuthentication,
  watchDashboard,
  watchRates,
  watchTransactions,
} from "./sagas/watcherSagas";

const saga = createSagaMiddleWare();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    rates: upperStripRateReducer,
    transactions: transactionReducer,
    nft:nftReducer,
  },
  middleware: [saga],
});

saga.run(watchDashboard);
saga.run(watchAuthentication);
saga.run(watchRates);
saga.run(watchTransactions);
