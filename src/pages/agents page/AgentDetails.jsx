import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import classes from './AgentDetails.module.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAgentDetails } from '../../utils/redux/slice/agentsSlice';
import { ClipLoader } from 'react-spinners'
const AgentDetails=()=>{
    const[handlingLeads,setHandlinLeads]=useState([]);
    const[searchParams]=useSearchParams();
    const id=searchParams.get('id');
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {agent,status}=useSelector(state=>state.agents);
    const {leads}=useSelector(state=>state.leads);
    const {currentAgent}=useSelector(state=>state.agents);
    const navigateAgents=()=>{
        navigate("/agents")
    }
    const navigateDetails=(id)=>{
        navigate(`/leads/details/${id}`)
    }
    let formattedDate = "N/A"; 
    if (agent?.createdAt) {
        const date = new Date(agent.createdAt);
        if (!isNaN(date.getTime())) { 
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); 
            const day = String(date.getDate()).padStart(2, '0'); 
            formattedDate = `${year}-${month}-${day}`;
        }
    }
    useEffect(()=>{
        if(agent._id){
            const filterLeads=leads.filter(el=>el.salesAgent._id===agent._id);
            setHandlinLeads(filterLeads)
        }
    },[agent])
    
    useEffect(()=>{
        dispatch(getAgentDetails(id))
    },[])
    return(
        <div>
        <Navbar/>
        <Sidebar/>
        <div className={classes['details-page']}>
        <div className={classes['details-header']}>
        <h2>Agent Details</h2>
        <button onClick={navigateAgents}>Agents</button>
        </div>
        {status==='pending' && <div className={classes.loader}><ClipLoader/></div>}
        {agent._id && status!=='pending' && <div className={classes['agent-details']}>
            <p><strong>Name:</strong>{agent.name}</p>
            <p><strong>Email:</strong>{agent.email}</p>
            <p><strong>Register Date:</strong>{formattedDate}</p>
            </div>}
        <h2>Handling Leads</h2> 
        {handlingLeads.length>0 && status!=='pending' && <div className={classes['handling-leads']}>
        {handlingLeads.map(el=>(
            <div>
            <h3>{el.name}</h3>
            <p><strong>Budget:</strong>{el.budget}</p>
            <p>Time to Close: {el.timeToClose}</p>
            <button onClick={()=>navigateDetails(el._id)}>Details</button>
            </div>
        ))}
        </div>}   
        </div>
        </div>
        
    )
}
export default AgentDetails;