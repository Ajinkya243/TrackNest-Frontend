import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCommentById=createAsyncThunk('comment/id',async(id)=>{
    const response=await axios(`https://track-nest-backend.vercel.app/leads/${id}/comments`);
    console.log(response);
})
export const postComment=createAsyncThunk('post/comment',async(obj)=>{
    const{lead,author,commentText}=obj;
    const response=await axios.post(`https://track-nest-backend.vercel.app/leads/${lead}/comments`,{author,commentText});
    console.log(response);
    return response.data;
})


const commentsSlice=createSlice({
    name:'comments',
    initialState:{
        comments:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getCommentById.pending,state=>{
            state.status="pending"
        })
        .addCase(getCommentById.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.comments=action.payload
        })
        .addCase(getCommentById.rejected,state=>{
            state.status="pending"
        })
        .addCase(postComment.fulfilled,(state,action)=>{
            state.comments.push(action.payload);
        })
    }
})

export default commentsSlice.reducer