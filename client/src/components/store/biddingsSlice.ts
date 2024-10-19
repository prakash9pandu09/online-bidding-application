import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Bid, PlaceBidRequest, Product } from "../common/types";

type InitialState = {
    biddingItems: Product[],
    bids: Bid[]
}
export const initialState: InitialState = {
    biddingItems: [],
    bids: []
}

export const getBiddingItems = createAsyncThunk('getBiddingItems', async () => {
    const getBiddingItemsResponse = await axios.get("http://localhost:5100/api/product/getItems", {withCredentials: true});
    const getBiddingItemsData = getBiddingItemsResponse.data
    return getBiddingItemsData;
});

export const placeBid = createAsyncThunk('placeBid', async (bidData: PlaceBidRequest) => {
    const placeBidResponse = await axios.post("http://localhost:5100/api/product/placeBid", bidData, {withCredentials: true});
    const placeBidData = placeBidResponse.data;
    console.log(placeBidData);
    return placeBidData;
});

export const getBids = createAsyncThunk('getBids', async (productId: number) => {
    const getBidsResponse = await axios.get(`http://localhost:5100/api/product/getBids?productId=${productId}`, {withCredentials: true});
    const getBidsData = getBidsResponse.data;
    return getBidsData;
});

export const biddingSlice = createSlice({
    name: 'bidding',
    initialState: initialState,
    reducers: {
        setItemAsFavorite : (state, action) => {
            const favoriteItems = state.biddingItems.map(item => {
                if(item.id === action.payload) {
                    let fav = item.isFavorite ? false : true
                    return {...item, isFavorite: fav}
                }
                return item;
            });
            state.biddingItems = favoriteItems;
        },
        setCurrentBidPrice : (state, action) => {
            const currentBidItems = state.biddingItems.map(item => {
                if(item.id === action.payload.id) {
                    let curBid = item.currentBid > action.payload.bidPrice ? item.currentBid : action.payload.bidPrice
                    return {...item, currentBid: curBid}
                }
                return item;
            });
            state.biddingItems = currentBidItems; 
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getBiddingItems.fulfilled, (state, action) => {
            if(action.payload.success) {
                state.biddingItems = action.payload.data;
            }
        });
        builder.addCase(placeBid.fulfilled, (state, action) => {
            state.bids = [action.payload.data, ...state.bids];
        });
        builder.addCase(getBids.fulfilled, (state, action) => {
            state.bids = action.payload.data;
        });
    },
});

export const {setItemAsFavorite, setCurrentBidPrice} = biddingSlice.actions;

export default biddingSlice.reducer;