type Price = {
  amount: number
}

export type Bid = {
    domainName: string;
    startingPrice: number;
    currentPrice: number;
    latestBid: Price,
    auctionEndTime: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    bid: number;
    _id: string;
    history: {
      date: string;
      bidderName: string;
      price: number;
      total: number;
    }[];
  };
export type User = {
  firstName: string,
  lastName: string
}
export type HistoryType = {
  _id: string;
  createdAt: string,
  amount: number,
  user: User
}

export type CardDataType = {
    heading: string;
}
export type Option = {
    name: string;
    value: string
}