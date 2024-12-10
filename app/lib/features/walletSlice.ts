import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WalletStateProps {
  myDoge: any;
  address: string;
  connected: boolean;
}

const initialState: WalletStateProps = {
  myDoge: {},
  address: "",
  connected: false,
};

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const walletSlice = createAppSlice({
  name: "wallet",
  initialState,
  reducers: (create: any) => ({
    setConnectedWallet: (
      state,
      action: PayloadAction<{
        connected: boolean;
        address: string;
        myDoge: any;
      }>
    ) => {
      state.connected = action.payload.connected;
      state.address = action.payload.address;
      state.myDoge = action.payload.myDoge
    },
    disconnectWallet: (state) => {
      state.myDoge = {};
      state.address = "";
      state.connected = false;
    },
  }),
});

export const { setConnectedWallet, disconnectWallet } = walletSlice.actions;

export default walletSlice.reducer;
