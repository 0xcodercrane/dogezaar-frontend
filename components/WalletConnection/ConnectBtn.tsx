"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import { WalletContext } from "@/context/wallet";
import { useContext } from "react";

export default function ConnectBtn() {
  const { isConnected, address, connectWallet, disconnectWallet } =
    useContext(WalletContext);

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

  return (
    <div>
      {!isConnected ? (
        <Button
          onPress={() => connectWallet()}
          className="border-2 border-solid border-white rounded-lg py-2"
        >
          Connect Wallet
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
              onClick={disconnectWallet}
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
