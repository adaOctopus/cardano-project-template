import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * CALL API ACTIONS
 */
// Define an async thunk for API call

export interface CardanoWalletState {
  loading: boolean | null;
  error: any;
  wallet: any
}

export const initialState: CardanoWalletState = {
  wallet: {},
  loading: false,
  error: null,
};

export const walletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {
        connectWalletRedux: (state, { payload: wallet} ) => {
        state.wallet = Object.assign({}, wallet);
        //console.log('agentSlice', state.agent)
      },
      disconnectWalletRedux: (state) => {
        state.wallet = Object.assign({}, initialState.wallet);
      },
      updateWalletRedux: (state, { payload: wallet} ) => {
        state.wallet = Object.assign({}, state.wallet, wallet);
      }
    },
  });
  
  export const { connectWalletRedux, disconnectWalletRedux, updateWalletRedux } = walletSlice.actions;
  export const walletReducer = walletSlice.reducer;