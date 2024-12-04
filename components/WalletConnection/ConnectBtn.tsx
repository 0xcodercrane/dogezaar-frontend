"use client";
import { useEffect, useState, useRef, useCallback } from "react";
// import Button from "../UI/Button";
import { useInterval } from "@/hooks/useInterval";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { useAppDispatch } from "@/app/lib/hooks";
import {
  setConnectedWallet,
  disconnectWallet,
} from "@/app/lib/features/walletSlice";

export default function ConnectBtn() {
  const dispatch = useAppDispatch();
  const [myDoge, setMyDoge] = useState<any>();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [btnText, setBtnText] = useState("Connect Wallet");
  const intervalRef = useRef<any>();

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

  function abbreviatedAddress(
    walletAddress: string,
    startLength: number,
    endLength: number
  ): string {
    return (
      walletAddress.slice(0, startLength) +
      "..." +
      walletAddress.slice(-endLength)
    );
  }

  const checkConnection = useCallback(async () => {
    if (connected) {
      const connectionStatusRes = await myDoge
        .getConnectionStatus()
        .catch(console.error);

      if (!connectionStatusRes?.connected) {
        setConnected(false);
        setAddress("");
        setBtnText("Wallet Connect");
      }
    }
  }, [connected, myDoge]);

  useInterval(checkConnection, 5000, false);

  const onConnect = useCallback(async () => {
    if (!myDoge?.isMyDoge) {
      alert("MyDoge wallet is not installed");
      return;
    }

    try {
      if (connected) {
        const disconnectedRes = await myDoge.disconnect();
        console.log("disconnect result", disconnectedRes);
        if (disconnectedRes.disconnected) {
          setConnected(false);
          setAddress("");
          setBtnText("Connect Wallet");
          dispatch(disconnectWallet());
        }
        return;
      }

      const connectRes = await myDoge.connect();
      console.log("connect result", connectRes);
      if (connectRes.approved) {
        setConnected(true);
        setAddress(connectRes.address);
        setBtnText("Disconnect");
        const data = {
          connected: true,
          address: connectRes.address,
        };
        dispatch(setConnectedWallet(data));
      }
    } catch (error) {}
  }, [connected, myDoge]);

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
            className="bg-primary-DEFUAULT rounded-md"
          >
            <DropdownItem
              key="edit"
              className="hover:bg-slate-600 py-2 cursor-pointer"
            >
              {abbreviatedAddress(address, 8, 4)}
            </DropdownItem>
            <DropdownItem
              key="delete"
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
