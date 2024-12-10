"use client";

import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import { useCallback } from "react";
import { toast } from "react-toastify";

export default function usePayDoge(amount: number, payAddress: string) {
  const wallet = useAppSelector((state: RootState) => state?.wallet);

  const handlePayDoge = useCallback(async () => {
    try {
      if (!wallet.connected) return alert("Please connect wallet first");

      const response = await wallet.myDoge.getBalance();
      if (Number(response.balance) <= amount) {
        return toast.warn("Insufficient Balance!");
      }
      const requestTx = await wallet.myDoge.requestTransaction({
        recipientAddress: payAddress,
        dogeAmount: amount,
      });
    } catch (error) {
      console.log(error);
    }
  }, [wallet.myDoge, wallet.connected]);

  return { handlePayDoge };
}
