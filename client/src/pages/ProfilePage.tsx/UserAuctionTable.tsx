import React from 'react'
import BaseTable from '../../components/BaseTable'
import { useDeleteAuctionMutation, useGetAuctionsQuery, useSelectWinnerMutation } from '../../api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserAuctionTable = () => {
    const { userId } = useParams();

    const [selectWinner] = useSelectWinnerMutation()
    const { data: auctionData } = useGetAuctionsQuery({
        userId
    });
    const [deleteAuction] = useDeleteAuctionMutation()
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

    const handleDeleteAuction = async (auctionId: string) => {
        const resp = await deleteAuction({ auctionId });
        if(resp.error){
            const err = resp.error as any
            toast.error(err.data.message)
        }else{
            toast.success(resp.data.message)
        }
    }
    return (
        <div>
            <BaseTable
                auctionData={auctionData || []}
                handleWinner={handleWinner}
                handleDeleteAuction={handleDeleteAuction}
            />
        </div>
    )
}

export default UserAuctionTable
