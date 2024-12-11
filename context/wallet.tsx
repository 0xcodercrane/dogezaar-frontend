"use client";
import { updateWalletData } from "@/app/lib/features/walletSlice";
import { useAppDispatch } from "@/app/lib/hooks";
import { connect } from "http2";
import { createContext, ReactNode, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

type walletContextType = {
  isConnected: boolean;
  address: string;
  connectWallet: () => void;
  disconnectWallet: () => void;
  PayDoge: (number, string) => void;
};

const walletContextDefaultValues: walletContextType = {
  isConnected: false,
  address: "",
  connectWallet: () => {},
  disconnectWallet: () => {},
  PayDoge: (amount: number, payAddress: string) => {},
};

export const WalletContext = createContext<walletContextType>(
  walletContextDefaultValues
);

type Props = {
  children: ReactNode;
};

export function WalletProvider({ children }: Props) {
  const dispatch = useAppDispatch();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>("");
  const [myDoge, setMyDoge] = useState<any>();
  const isMounted = useRef(false);
  const intervalRef = useRef<any>();

  useEffect(() => {
    if (!isMounted.current) {
      disconnectWallet();
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    if (!myDoge && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const { doge } = window as any;
        if (doge?.isMyDoge) {
          setMyDoge(doge);
          console.log(doge);
          clearInterval(intervalRef.current);
          console.log("My Doge API injected from interval");
        } else {
          console.log("MyDoge API not injected");
        }
      }, 1000);
    }
  }, [myDoge]);

  const connectWallet = async () => {
    if (!myDoge?.isMyDoge) {
      toast.warn("MyDoge wallet is not installed");
      return;
    }

    try {
      const connectRes = await myDoge.connect();
      if (connectRes.approved) {
        setIsConnected(true);
        setAddress(connectRes.address);
        const data = {
          connected: true,
          address: connectRes.address,
        };
        dispatch(updateWalletData(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    try {
      const disconnectedRes = await myDoge.disconnect();
      if (disconnectedRes.disconnected) {
        setIsConnected(false);
        setAddress("");
        const data = {
          connected: false,
          address: "",
        };
        dispatch(updateWalletData(data));
      }
    } catch (error) {}
    setIsConnected(false);
    setAddress("");
    console.log("runnning disconnect wallet");
  };

  const PayDoge = async (amount: number, payAddress: string) => {
    if (!myDoge) {
      toast.warn("MyDoge wallet is not installed");
      return;
    }
    if (myDoge?.isMyDoge) {
      const response = await myDoge.getBalance();
      if (Number(response.balance) <= amount) {
        return toast.warn("Insufficient Balance");
      }
      await myDoge.requestTransaction({
        dogeAmount: amount,
        recipientAddress: payAddress,
      });
    } else {
      toast.warn("Connect wallet first");
      return;
    }
  };

  const value = {
    isConnected,
    address,
    connectWallet,
    disconnectWallet,
    PayDoge,
  };

  return (
    <>
      <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
    </>
  );
}
