import { convertDate } from "@/utils/helper";

const OrderItem = ({ orderItem }) => {
  return (
    <div className="flex w-full items-center p-2 rounded-md cursor-pointer hover:bg-primary-DEFUAULT">
      <div className="w-1/3">{orderItem.id}</div>
      <div className="w-1/6">{orderItem.amount}</div>
      <div className="w-1/6">{orderItem.status}</div>
      <div className="w-1/3">{convertDate(orderItem.createdAt)}</div>
    </div>
  );
};

export default OrderItem;
