import { TOrderInfo } from "@/types/lauchpad.type";
import { convertDate } from "@/utils/helper";
import { useEffect } from "react";

const OrderItem = ({
  orderItem,
  selectedItem,
  handleClick,
  setSelectedItem,
}: {
  orderItem: TOrderInfo;
  selectedItem: TOrderInfo | undefined;
  handleClick: () => void;
  setSelectedItem: (TOrderInfo) => void;
}) => {
  useEffect(() => {
    if (selectedItem) {
      handleClick();
    }
  }, [selectedItem]);

  function showModal() {
    setSelectedItem(orderItem);
  }
  return (
    <div>
      <div
        className="flex w-full items-center p-2 rounded-md cursor-pointer hover:bg-primary-DEFUAULT"
        onClick={showModal}
      >
        <div className="w-1/3">{orderItem.id}</div>
        <div className="w-1/6">{orderItem.amount}</div>
        <div className="w-1/6">{orderItem.status}</div>
        <div className="w-1/3">{convertDate(orderItem.createdAt)}</div>
      </div>
    </div>
  );
};

export default OrderItem;
