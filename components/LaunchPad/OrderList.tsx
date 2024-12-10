import { TOrderInfo } from "@/types/lauchpad.type";
import OrderItem from "./OrderItem";
import OrderStatusModal from "./OrderStatusModal";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

export default function OrderList({
  orderLists,
  address,
}: {
  orderLists: TOrderInfo[];
  address: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [seletedItem, setSelectedItem] = useState<TOrderInfo>();
  return (
    <div className="w-4/5 md:w-2/3 p-8 ">
      <div>
        <h2 className="font-bold w-full md:w-[30%] text-4xl py-4">My Orders</h2>
        <hr className="border-primary-DEFUAULT" />
      </div>
      <div className="flex w-full items-center p-2  font-bold text-xl text-white">
        <div className="md:w-1/3">Order Id</div>
        <div className="w-1/6">Quantity</div>
        <div className="w-1/6">Status</div>
        <div className="w-1/3">Date</div>
      </div>
      {address ? (
        orderLists.length > 0 ? (
          orderLists.map((orderItem, index) => {
            return (
              <OrderItem
                key={index}
                orderItem={orderItem}
                handleClick={onOpen}
                setSelectedItem={setSelectedItem}
                selectedItem={seletedItem}
              />
            );
          })
        ) : (
          <div className="text-center py-6 text-xl">
            There is no orders you created
          </div>
        )
      ) : (
        <div className="text-center py-6 text-xl">
          Please connect your wallet
        </div>
      )}
      {seletedItem && (
        <OrderStatusModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          orderInfo={seletedItem}
        />
      )}
    </div>
  );
}
