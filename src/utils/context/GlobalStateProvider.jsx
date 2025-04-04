import { Children, createContext, useContext, useState } from "react";

const GlobalStateContext=createContext();

const GlobalStateProvider=({children})=>{
    const[tab,setTab]=useState('dashboard');

    return(
        <GlobalStateContext.Provider 
        value={{
            tab,setTab
        }}>
            {children}
        </GlobalStateContext.Provider>
    )
}
export const useGlobalState=()=>useContext(GlobalStateContext);
export default GlobalStateProvider;