import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAgents=createAsyncThunk('fetch/agents',async()=>{
    const response=await axios.get("https://track-nest-backend.vercel.app/agents");
    return response.data;
})
export const registerAgent=createAsyncThunk('register/agent',async(agent)=>{
    const response=await axios.post("https://track-nest-backend.vercel.app/agents",agent);
    return response.data;
})
export const loginAgent=createAsyncThunk('login/agent',async({name,email})=>{
    const response=await axios.get("https://track-nest-backend.vercel.app/agents/login",{params:{name,email}});
    return response.data;
})
export const getAgentDetails=createAsyncThunk('agent/details',async(id)=>{
    const response=await axios.get(`https://track-nest-backend.vercel.app/agents/${id}`);
    console.log(response);
    return response.data;
})

export const agentsSlice=createSlice({
    name:'agents',
    initialState:{
        agents:[],
        currentAgent:{},
        agent:{},
        status:'idle',
        error:'null'
    },
    reducers:{
        setCurrentAgent:(state,action)=>{
            state.currentAgent=action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAgents.pending,state=>{
            state.status='pending'
        })
        .addCase(fetchAgents.fulfilled,(state,action)=>{
            state.status="fullfilled"
            state.agents=action.payload
        })
        .addCase(fetchAgents.rejected,(state,action)=>{
            state.status="rejected"
            state.agents=action.payload
        })
        .addCase(getAgentDetails.pending,state=>{
            state.status="pending"
        })
        .addCase(getAgentDetails.fulfilled,(state,action)=>{
            state.status="fullfilled"
            state.agent=action.payload
            console.log(state.agent)
        })
    }

})
export const {setCurrentAgent}=agentsSlice.actions;
export default agentsSlice.reducer;