import React from 'react'
import { Bid } from '../../types/bid.type'
import AuctionCardComponent from '../../components/CardComponent';

type Props = {
  data: Bid;
}
const BidCard = ({ data }: Props) => {
  return (
    <div>
        <AuctionCardComponent {...data}/>
    </div>
  )
}


export default BidCard;
