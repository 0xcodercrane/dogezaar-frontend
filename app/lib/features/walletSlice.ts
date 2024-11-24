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
      }>
    ) => {
      state.connected = action.payload.connected;
      state.address = action.payload.address;
    },
    disconnectWallet: (state) => {
      state = initialState;
    },
  }),
});

export const { setConnectedWallet, disconnectWallet } = walletSlice.actions;

export default walletSlice.reducer;
