// services/api.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }), // Base URL for API requests
  tagTypes: ['Auction'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "posts", // endpoint for fetching posts
    }),
    signupUser: builder.mutation({
      query: (userData) => ({
        url: "/users/signup", // Endpoint path
        method: "POST", // HTTP method
        body: userData, // Data to be sent to the server
      }),
    }),
    loginUser: builder.mutation({
      query: (loginData) => {
        return {
          url: "/users/login", // Endpoint path for login
          method: "POST", // HTTP method
          body: loginData, // Data to be sent to the server
        };
      },
    }),

    createAuction: builder.mutation({
      query: (auctionData) => {
        return {
          url: "/auctions", // Endpoint path for login
          method: "POST", // HTTP method
          body: auctionData, // Data to be sent to the server
        };
      },
      invalidatesTags: ['Auction'],
    }),
    getAuctions: builder.query({
      query: ({ domainName }) => {
        return `/auctions?name=${domainName || ""}`;
      },
      providesTags: ['Auction']
    }),
    placeBid: builder.mutation({
      query: (bidData) => ({
        url: `/auctions/${bidData.auctionId}/bid`,
        method: "POST",
        body: bidData,
      }),
      invalidatesTags: ['Auction']
    }),
    getAllBid: builder.query({
      query: (bidData) => `/auctions/${bidData.auctionId}/bid`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPostsQuery,
  useSignupUserMutation,
  useLoginUserMutation,
  useCreateAuctionMutation,
  useGetAuctionsQuery,
  usePlaceBidMutation,
  useGetAllBidQuery,
} = api;
