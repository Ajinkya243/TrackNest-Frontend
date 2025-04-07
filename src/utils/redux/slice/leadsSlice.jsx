import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchLeads=createAsyncThunk('fetch/leads',async()=>{
    const response=await axios.get("https://track-nest-backend.vercel.app/leads");
    return response.data;
})

export const pipelineLeads=createAsyncThunk('pipeline/leads',async()=>{
    const response=await axios.get("https://track-nest-backend.vercel.app/report/pipeline");
    return response.data;
})
export const getLeadById=createAsyncThunk('leads/id',async(id)=>{
    const response=await axios.get(`https://track-nest-backend.vercel.app/leads/${id}`);
    return response.data;
})
export const addLead=createAsyncThunk('post/lead',async(lead)=>{
    const response=await axios.post(`https://track-nest-backend.vercel.app/leads`,lead);
    return response.data;
})
export const updateLead=createAsyncThunk('update/lead',async({id,lead})=>{
    const response=await axios.post(`https://track-nest-backend.vercel.app/leads/${id}`,lead);
    return response.data;
})
export const leadsSlice=createSlice({
    name:'leads',
    initialState:{
        leads:[],
        pipeline:[],
        lead:{},
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLeads.pending,state=>{
            state.status='pending'
        })
        .addCase(fetchLeads.fulfilled,(state,action)=>{
            state.status='fulfilled'
            state.leads=action.payload
        })
        .addCase(fetchLeads.rejected,state=>{
            state.status='rejected'
            state.error='Error Occur'
        })
        .addCase(pipelineLeads.fulfilled,(state,action)=>{
            state.pipeline=action.payload;
        })
        .addCase(getLeadById.pending,state=>{
            state.status='pending'
        })
        .addCase(getLeadById.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.lead=action.payload
        })
    }
    
})
export default leadsSlice.reducer;