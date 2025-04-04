import { configureStore } from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage';
import leadsReducer from '../slice/leadsSlice';
import {persistStore, persistReducer} from "redux-persist";
import agentsReducer from '../slice/agentsSlice';
import commentsReducer from '../slice/commentsSlice';
const leadsPersistConfig={
    key:'leads',
    storage,
    whitelist:['leads']
}
const agentsPersistConfig={
    key:'agents',
    storage,
    whitelist:['agents','currentAgent']
}
const commentsPersistConfig={
    key:'comments',
    storage,
    whitelist:[]
}

const leadsPersistedConfig=persistReducer(leadsPersistConfig,leadsReducer);
const agentsPersistedConfig=persistReducer(agentsPersistConfig,agentsReducer);
const commentsPersistedConfig=persistReducer(commentsPersistConfig,commentsReducer);

const store=configureStore({
    reducer:{
        leads:leadsPersistedConfig,
        agents:agentsPersistedConfig,
        comments:commentsPersistedConfig
    }
})
export const persistor=persistStore(store);
export default store;