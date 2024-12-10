"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import {
  BsTwitterX,
  BsGlobe2,
  BsDiscord,
  BsTelegram,
  BsInstagram,
} from "react-icons/bs";
import { useParams } from "next/navigation";
import { AxiosInstance } from "@/utils/axios";
import { TCollection } from "@/types/collections.type";
import { TOrderInfo } from "@/types/lauchpad.type";
import { useAppSelector } from "@/app/lib/hooks";
import { RootState } from "@/app/lib/store";
import OrderModal from "@/components/LaunchPad/OrderModal";
import { useDisclosure } from "@nextui-org/react";
import OrderItem from "@/components/LaunchPad/OrderItem";
import OrderList from "@/components/LaunchPad/OrderList";
import usePayDoge from "@/hooks/usePayDoge";

const price = 0.0023;
export default function LaunchPad() {
  const { id } = useParams();
  const [count, setCount] = useState<number>(1);
  const [collectionInfo, setCollectionInfo] = useState<TCollection>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    website: "",
    xHandle: "",
    discordHandle: "",
    telegramHandle: "",
    instagramHandle: "",
    creatorName: "",
    creatorEmail: "",
    creatorDogeAddress: "",
    thumbnail: "https://jfccetnvabkrjkwrdwyz.supabase.co",
    banner: "",
    totalSupply: 0,
    minted: 0,
    inscriptions: "",
    createdAt: "",
    updatedAt: "",
  });
  const wallet = useAppSelector((state: RootState) => state?.wallet);
  const [orderInfo, setOrderInfo] = useState<TOrderInfo>();
  const [receivedAddress, setReceivedAddress] = useState(wallet.address || "");
  const [orderLists, setOrderLists] = useState<TOrderInfo[]>([]);
  const intervalRef = useRef<NodeJS.Timeout>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchOrderLists = async () => {
      try {
        if (wallet.address !== "") {
          const response = await AxiosInstance.get(
            `apis/order/${wallet.address}`
          );
          if (response.status === 200) {
            setOrderLists(response.data);
          }
        }
      } catch (error) {}
    };
    setReceivedAddress(wallet.address)

    fetchOrderLists();
    return () => clearInterval(intervalRef.current);
  }, [wallet.address]);

  function fetchOrderData(orderId) {
    intervalRef.current = setInterval(async () => {
      try {
        const response = await AxiosInstance.get(
          `/apis/order/getOrderById/${orderId}`
        );
        setOrderInfo(response.data);
      } catch (error) {
        console.error("Error checking order status:", error);
      }
    }, 10000);
  }

  const mintedPercent = useMemo(() => {
    if (collectionInfo.minted === 0) {
      return 0;
    } else {
      return (collectionInfo.minted / collectionInfo.totalSupply) * 100;
    }
  }, [collectionInfo]);

  async function fetchCollectionData(id) {
    try {
      const response = await AxiosInstance(`apis/collections/${id}`);
      if (response.status === 200) {
        setCollectionInfo(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (orderInfo?.status !== "pending") {
      clearInterval(intervalRef.current);
    }
  }, [orderInfo?.status]);

  useEffect(() => {
    fetchCollectionData(id);
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      if (
        Number(inputValue) >
        collectionInfo.totalSupply - collectionInfo.minted
      )
        setCount(collectionInfo.totalSupply - collectionInfo.minted);
      else setCount(Number(inputValue));
    }
  };

  const handleMint = async () => {
    try {
      const data = {
        collectionId: id,
        price: collectionInfo.price,
        amount: count,
        address: receivedAddress,
      };
      const response = await AxiosInstance.post("apis/order/create", data);
      if (response.status === 200) {
        setOrderInfo(response.data);
        fetchOrderData(response.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-background pt-[200px] flex items-center">
      <div className="w-full flex flex-col items-center justify-center gap-12">
        <div className="grid w-4/5 md:w-2/3 grid-cols-1 px-8 md:grid-cols-2 gap-20">
          <div className="w-full h-[400px] sm:h-[500px] bg-primary-DEFUAULT rounded-md overflow-hidden">
            <Image
              src={collectionInfo.thumbnail}
              width={100}
              height={100}
              style={{ width: "100%", height: "100%" }}
              alt="Collection thumbnail image"
            ></Image>
          </div>
          <div className="w-full flex flex-col justify-between gap-4">
            <h2 className="text-4xl text-white">{"Doge Ordinal"}</h2>
            <div className="flex gap-2 items-center">
              <span className="bg-primary-DEFUAULT text-xl px-4 py-1 text-white rounded-lg ">
                Total Supply {collectionInfo.totalSupply}
              </span>
              <div className="flex text-2xl items-center gap-3">
                <a href={collectionInfo.website} target="_blank">
                  <BsGlobe2 className="cursor-pointer hover:text-white" />
                </a>
                <a href={collectionInfo.discordHandle} target="_blank">
                  <BsDiscord className="cursor-pointer hover:text-white" />
                </a>
                <a href={collectionInfo.telegramHandle} target="_blank">
                  <BsTelegram className="cursor-pointer hover:text-white" />
                </a>
                <a href={collectionInfo.xHandle} target="_blank">
                  <BsTwitterX className="cursor-pointer hover:text-white" />
                </a>
                <a href={collectionInfo.instagramHandle} target="_blank">
                  <BsInstagram className="cursor-pointer hover:text-white" />
                </a>
              </div>
            </div>
            <div>
              <p className="text-lg">{collectionInfo.description}</p>
            </div>
            <div className="bg-primary-DEFUAULT p-4 rounded-lg">
              <p className="text-3xl text-white">Price</p>
              <div className="flex items-center">
                <h3 className="text-2xl font-bold w-1/3">${price * count}</h3>
                <input
                  type="number"
                  step={1}
                  className="border-none w-2/3 text-2xl bg-transparent rounded-md p-2 outline-none text-right"
                  value={count}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                className="bg-[#f71f71] hover:bg-[#962651] overflow-hidden w-full text-2xl px-4 py-2 rounded-md text-white duration-200"
                onClick={onOpen}
              >
                Mint
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 rounded-md overflow-hidden w-full bg-primary-DEFUAULT">
                <div
                  className={
                    mintedPercent
                      ? `w-[${mintedPercent}%] rounded-md bg-white h-full`
                      : `w-0`
                  }
                ></div>
              </div>
              <div className="flex justify-between text-lg ">
                <span>Total Minted</span>
                <div>
                  <span className="text-white mr-2">{mintedPercent}</span>(
                  {collectionInfo.minted}/{collectionInfo.totalSupply})
                </div>
              </div>
            </div>
          </div>
        </div>
        <OrderList orderLists={orderLists} address={wallet.address} />
      </div>

      <OrderModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        address={orderInfo?.payAddress || ""}
        amount={orderInfo?.price || 0}
        submitOrder={handleMint}
        setReceivedAddress={setReceivedAddress}
        receivedAddress={receivedAddress}
      ></OrderModal>
    </div>
  );
}
