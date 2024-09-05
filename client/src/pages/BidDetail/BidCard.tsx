import React from 'react'
import CardComponent from '../../components/CardComponent'
import { Bid } from '../../types/bid.type'

type Props = {
  data: Bid;
}
const BidCard = ({ data }: Props) => {
  return (
    <div>
        <CardComponent heading={data.domainName}/>
    </div>
  )
}


export default BidCard;
