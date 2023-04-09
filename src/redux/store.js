import { configureStore } from "@reduxjs/toolkit";
import listenerMiddleware from "./listener";
import Reducer from "./reducer";

export const store = configureStore({
  reducer: Reducer,
  middleware: (getDefaulMiddleware) =>
    getDefaulMiddleware().prepend(listenerMiddleware.middleware),
});
