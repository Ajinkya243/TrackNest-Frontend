import { useEffect, useState } from "react";
import { useGlobalState } from "../../utils/context/GlobalStateProvider";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import classes from './AgentsPage.module.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchAgents } from "../../utils/redux/slice/agentsSlice";
import {SyncLoader} from 'react-spinners';
import { Link, useNavigate } from "react-router-dom";
const AgentsPage=()=>{
    const{setTab}=useGlobalState();
    const dispatch=useDispatch();
    const {agents,status}=useSelector(state=>state.agents);
    const[inputAgent,setInputAgent]=useState("");
    const filterAgents=agents.filter(el=>inputAgent==="" ||(el.name.toLowerCase().includes(inputAgent.toLowerCase())))
    const {currentAgent}=useSelector(state=>state.agents);
    const navigate=useNavigate();
    const navigateAddAgent=()=>{
        navigate("/add-agent");
    }
    useEffect(()=>{
        setTab('agents');
        dispatch(fetchAgents());
        if(!currentAgent.name || !currentAgent.email){
            navigate("/login");
        }
    },[])
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={classes['agents-page']}>
             {filterAgents.length>0 &&  
            <div>
             <div className={classes.header}>   
            <h2>Sales Agent Overview ({agents.length})</h2>
            <button onClick={navigateAddAgent}>+Add Agent</button>
            </div>
            <div className={classes.input}>
            <input type="text" placeholder="Search by agent" onChange={event=>setInputAgent(event.target.value)} />
            </div>
            {status==='pending'  && !filterAgents && <p style={{textAlign:'center'}}><SyncLoader/></p>}
            <div className={classes.grid}>
                <div className={classes['title-grid']}>
                <strong>Name</strong>
                <strong>Email</strong>
                <strong>Actions</strong>
                </div>
                <div className={classes['details-grid']}>
                {filterAgents.map(el=>(
                    <>
                    <p>{el.name}</p>
                    <p>{el.email}</p>
                    {/* <Link className={classes['details-link']} to={`/agents/details/${el._id}`}>Details</Link> */}
                    <Link className={classes['details-link']} to={`/agents/details?id=${el._id}`}>Details</Link>
                    </>
                ))}
                </div>
            </div>

            </div>
             }
             
            </div>
        </div>
    )
}
export default AgentsPage;