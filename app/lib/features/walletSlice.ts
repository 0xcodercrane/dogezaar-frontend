import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WalletStateProps {
  address: string;
  connected: boolean;
}

const initialState: WalletStateProps = {
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
    updateWalletData: (
      state,
      action: PayloadAction<{
        connected: boolean;
        address: string;
      }>
    ) => {
      state.connected = action.payload.connected;
      state.address = action.payload.address;
    },
  }),
});

export const { updateWalletData } = walletSlice.actions;

export default walletSlice.reducer;
