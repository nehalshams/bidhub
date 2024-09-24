import React from 'react'
import BaseTable from '../../components/BaseTable'
import { useGetUserBidsQuery } from '../../api'
import { useLocation, useParams } from 'react-router-dom'

const UserBidsTable = () => {
    const { userId } = useParams();

    const { data: UsersAuction } = useGetUserBidsQuery({
        userId
    })
    console.log("🚀 ~ UserBidsTable ~ UsersAuction:", UsersAuction)
    return (

        <div>
            <BaseTable
                auctionData={ []}
            />
        </div>
    )
}

export default UserBidsTable
