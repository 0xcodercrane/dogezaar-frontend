export type TOrderInfo = {
  id: string;
  collectionId: string;
  receiveAddress: string;
  payAddress: string;
  amount: number;
  price: number;
  status: string;
  inscriptions: {
    data: string;
  }[];
  createdAt: string;
  updatedAt: string;
};
