import React from 'react'
import BaseTable from '../../components/BaseTable'
import { useGetUserBidsQuery } from '../../api'
import { useLocation, useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

const UserBidsTable = () => {
    const { userId } = useParams();

    const { data: UserBids, isLoading } = useGetUserBidsQuery({
        userId
    })
    return (

        <div>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    <BaseTable
                        auctionData={UserBids || []}
                    />
            }
        </div>
    )
}

export default UserBidsTable
