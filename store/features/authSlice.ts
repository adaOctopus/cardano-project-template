import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  authState: boolean;
  userId: string | null;
  userEmail: string | null;
  isAnonymous: boolean;
}

const initialState: IAuthState = {
  authState: false,
  userId: null,
  userEmail: null,
  isAnonymous: false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action ) => {
      state.authState = action.payload.authState;
      state.userEmail = action.payload.userEmail;
      state.userId = action.payload.userId;
      state.isAnonymous = action.payload.isAnonymous;
    },
  },
});

export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;