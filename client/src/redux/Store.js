import { configureStore } from "@reduxjs/toolkit";
import { AlertSlice } from "./features/AlertSlice";
import { UserSlice } from "./features/UserSlice";

export default configureStore({
  reducer: {
    alerts: AlertSlice.reducer,
    user: UserSlice.reducer,
  },
});
