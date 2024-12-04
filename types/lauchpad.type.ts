export type TOrderInfo = {
  id: string;
  payAddress: string;
  amount: number;
  payPrice: number;
  inscriptions: {
    data: string;
  }[];
};
