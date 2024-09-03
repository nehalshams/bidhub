export type Bid = {
    name: string;
    price: number;
    bid: number;
    id: string;
    history: {
      date: string;
      bidderName: string;
      price: number;
      total: number;
    }[];
  };

export type CardDataType = {
    heading: string;
}
export type Option = {
    name: string;
    value: string
}