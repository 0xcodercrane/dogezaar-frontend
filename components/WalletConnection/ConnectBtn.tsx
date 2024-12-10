"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { 
  setConnectedWallet, 
  disconnectWallet 
} from "@/app/lib/features/walletSlice";
import { RootState } from "@/app/lib/store";
import { useInterval } from "@/hooks/useInterval";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";

export default function ConnectBtn() {
  const dispatch = useAppDispatch();
  const { connected, address, myDoge } = useAppSelector((state: RootState) => state.wallet);
  const [btnText, setBtnText] = useState("Connect Wallet");

  useEffect(() => {
    const { doge } = window as any;

    if (doge?.isMyDoge) {
      dispatch(setConnectedWallet({ connected, address, myDoge: doge }));
    }
  }, [dispatch]);

  useEffect(() => {
    const savedWallet = JSON.parse(localStorage.getItem("walletData") || "{}");

    if (savedWallet.connected) {
      const { doge } = window as any;
      if (doge?.isMyDoge) {
        doge
          .getConnectionStatus()
          .then((status) => {
            if (status.connected) {
              dispatch(
                setConnectedWallet({
                  connected: true,
                  address: savedWallet.address,
                  myDoge: doge,
                })
              );
            } else {
              handleDisconnect();
            }
          })
          .catch(() => handleDisconnect());
      }
    }
  }, [dispatch]);

  const abbreviatedAddress = (walletAddress: string, startLength: number, endLength: number): string => {
    return (
      walletAddress.slice(0, startLength) + "..." + walletAddress.slice(-endLength)
    );
  };

  const handleDisconnect = useCallback(async () => {
    if (myDoge) {
      try {
        const disconnectedRes = await myDoge.disconnect();
        if (disconnectedRes?.disconnected) {
          setBtnText("Connect Wallet");
          dispatch(disconnectWallet());
          localStorage.removeItem("walletData");
        }
      } catch (error) {
        console.error("Failed to disconnect wallet:", error);
      }
    }
  }, [myDoge, dispatch]);

  const checkConnection = useCallback(async () => {
    if (connected) {
      try {
        const connectionStatusRes = await myDoge?.getConnectionStatus();
        if (!connectionStatusRes?.connected) {
          handleDisconnect();
        }
      } catch (error) {
        console.error("Error checking connection status:", error);
      }
    }
  }, [connected, myDoge, handleDisconnect]);

  useInterval(checkConnection, 5000, false);

  const onConnect = async () => {
    const { doge } = window as any;

    if (!doge?.isMyDoge) {
      alert("MyDoge wallet is not installed");
      return;
    }

    try {
      if (connected) {
        await handleDisconnect();
        return;
      }

      const connectRes = await doge.connect();
      if (connectRes.approved) {
        setBtnText("Disconnect");
        const walletData = {
          connected: true,
          address: connectRes.address,
        };
        localStorage.setItem("walletData", JSON.stringify(walletData));
        dispatch(
          setConnectedWallet({
            connected: true,
            address: connectRes.address,
            myDoge: doge,
          })
        );
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <div>
      {!connected ? (
        <Button
          onPress={onConnect}
          className="border-2 border-solid border-white rounded-lg py-2"
        >
          {btnText}
        </Button>
      ) : (
        <Dropdown backdrop="blur">
          <DropdownTrigger>
            <Button className="border-2 border-solid border-white rounded-lg py-2">
              {abbreviatedAddress(address, 8, 4)}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            className="bg-primary-DEFAULT rounded-md"
          >
            <DropdownItem
              key="address"
              className="hover:bg-slate-600 py-2 cursor-pointer"
            >
              {abbreviatedAddress(address, 8, 4)}
            </DropdownItem>
            <DropdownItem
              key="disconnect"
              onClick={onConnect}
              className="text-danger hover:bg-slate-600 py-2 cursor-pointer"
              color="danger"
            >
              Disconnect
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}
