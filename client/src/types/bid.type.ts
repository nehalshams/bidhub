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
    totalBids: number;
    _id: string;
    isBookmarked: boolean;
    bidHistory: {
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
    endDate: string;
    startingPrice: number;
}
export type Option = {
    name: string;
    value: string
}