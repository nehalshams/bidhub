import React from 'react'
import BaseTable from '../../components/BaseTable'
import { useGetAuctionsQuery } from '../../api';
import { useParams } from 'react-router-dom';

const UserAuctionTable = () => {
    const { userId } = useParams();

    console.log("🚀 ~ UserAuctionTable ~ params:")
    const { data: auctionData, isLoading, isFetching, error } = useGetAuctionsQuery({
        userId
    });
    const handleWinner = () => {
        
    }
    return (
        <div>
            <BaseTable
                auctionData={auctionData || []}
                handleWinner={ handleWinner}
            />
        </div>
    )
}

export default UserAuctionTable
