"use client";
import { createContext, ReactNode, useState } from "react";

type walletContextType = {
  isConnected: boolean;
  address: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
};

const walletContextDefaultValues: walletContextType = {
  isConnected: false,
  address: "",
  connectWallet: () => {},
  disconnectWallet: () => {},
};

export const WalletContext = createContext<walletContextType>(
  walletContextDefaultValues
);

type Props = {
  children: ReactNode;
};

export function WalletProvider({ children }: Props) {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const connectWallet = () => {
    console.log("running wallet connect");
    setIsConnected(true);
    setAddress("DCdPWgf1K39b3SkZMiYVdhAmEshNvGFT8s")
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAddress("")
    console.log("runnning disconnect wallet");
  };

  const value = {
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
  };

  return (
    <>
      <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
    </>
  );
}
