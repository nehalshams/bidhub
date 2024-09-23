import React from 'react'
import BaseTable from '../../components/BaseTable'
import { useGetAuctionsQuery, useSelectWinnerMutation } from '../../api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserAuctionTable = () => {
    const { userId } = useParams();

    const [selectWinner] = useSelectWinnerMutation()
    const { data: auctionData } = useGetAuctionsQuery({
        userId
    });
    const handleWinner = async (auctionId: string, bidderId: string) => {
        const resp = await selectWinner({
            auctionId,
            winnerId: bidderId,
            userId
        })
        if(resp.data){
            toast.success(resp.data.message)
        }else{
            const err = resp.error as any
            toast.error(err.data.message)
        }

    }
    return (
        <div>
            <BaseTable
                auctionData={auctionData || []}
                handleWinner={handleWinner}
            />
        </div>
    )
}

export default UserAuctionTable
