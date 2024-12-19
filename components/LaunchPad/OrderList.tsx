import { useState, useContext, useEffect, useRef } from "react";
import { TOrderInfo } from "@/types/lauchpad.type";
import OrderItem from "./OrderItem";
import OrderStatusModal from "./OrderStatusModal";
import { useDisclosure } from "@nextui-org/react";
import { WalletContext } from "@/context/wallet";
import { AxiosInstance } from "@/utils/axios";

export default function OrderList({
  orderLists,
}: {
  orderLists: TOrderInfo[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<TOrderInfo>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = orderLists.slice(startIndex, endIndex);
  const totalPages = Math.ceil(orderLists.length / itemsPerPage);

  const { isConnected } = useContext(WalletContext);

  useEffect(() => {
    if (!selectedItem) return;

    intervalRef.current = setInterval(async () => {
      try {
        const response = await AxiosInstance.get(
          `/apis/order/getOrderById/${selectedItem.id}`
        );
        setSelectedItem(response.data);
      } catch (error) {
        console.error("Error checking order status:", error);
      }
    }, 10000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [selectedItem]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleModalClose = () => {
    // Clear interval and reset selectedItem when modal closes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setSelectedItem(undefined);
    onOpenChange(); // Toggle modal state
  };

  return (
    <div className="w-full md:w-2/3 p-8 ">
      <div className="flex justify-between items-center">
        <h2 className="font-bold w-full md:w-[30%] text-4xl py-4">My Orders</h2>
        {orderLists.length > itemsPerPage && (
          <div className="flex justify-between gap-3 items-center">
            <button
              className="bg-primary-DEFUAULT rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="bg-primary-DEFUAULT rounded-md px-4 py-2 cursor-pointer hover:bg-gray-600"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <hr className="border-primary-DEFUAULT" />
      <div className="flex w-full items-center p-2 font-bold text-xl text-white">
        <div className="md:w-1/3">Order Id</div>
        <div className="w-1/6">Quantity</div>
        <div className="w-1/6">Status</div>
        <div className="w-1/3">Date</div>
      </div>
      {isConnected ? (
        orderLists.length > 0 ? (
          paginatedOrders.map((orderItem, index) => {
            return (
              <OrderItem
                key={index}
                orderItem={orderItem}
                handleClick={onOpen}
                setSelectedItem={setSelectedItem}
                selectedItem={selectedItem}
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
      {selectedItem && (
        <OrderStatusModal
          isOpen={isOpen}
          onOpenChange={handleModalClose}
          orderInfo={selectedItem}
        />
      )}
    </div>
  );
}
