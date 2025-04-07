import { useDispatch, useSelector } from "react-redux";
import classes from './LeadsPage.module.css';
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../utils/context/GlobalStateProvider";
import { Link, useNavigate } from "react-router-dom";
import { fetchLeads } from "../../utils/redux/slice/leadsSlice";
const LeadsPage=()=>{
    const{leads}=useSelector(state=>state.leads);
    const{setTab}=useGlobalState();
    const[inputLead,setInputLead]=useState("");
    const[inputStatus,setInputStatus]=useState("");
    const[inputSort,setInputSort]=useState("");
    const{currentAgent}=useSelector(state=>state.agents);
    const filterLeads=leads.filter(el=> (inputLead===""|| (el.name.toLowerCase().includes(inputLead.toLowerCase()))) && (inputStatus==="" || (el.status===inputStatus))).sort((a,b)=>{
        if(inputSort==='ascending') return a.timeToClose-b.timeToClose;
        if(inputSort==='descending') return b.timeToClose-a.timeToClose;
        return 0;
    })
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const navigateForm=()=>{
        navigate("/leads/form")
    }
    useEffect(()=>{
        setTab("leads");
        if(!currentAgent.name || !currentAgent.email){
            navigate("/login");
        }
        dispatch(fetchLeads())
    },[])
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={classes['leads-page']}>
            <div className={classes.header}>
                <h2>Leads Overview ({leads.length})</h2>
                <button onClick={navigateForm}>Add Lead</button>
            </div>
            <div className={classes.filters}>
                <input type="text" placeholder="Search by lead" onChange={event=>setInputLead(event.target.value)}/>
                <div className={classes['select-filters']}>
                    <select name="" id="" onChange={event=>setInputStatus(event.target.value)}>
                        <option value="">Filter By Status</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="New">New</option>
                        <option value="Closed">Closed</option>
                    </select>
                    <select name="" id="" onChange={event=>setInputSort(event.target.value)}>
                        <option value="">Sort By</option>
                        <option value="ascending">Time to Closed - Asc</option>
                        <option value="descending">Time to Closed - Desc</option>
                    </select>
                </div>
            </div>
            <div className={classes['details']}>
            <div className={classes['grid-title']}>
            <strong>Lead Name</strong>
            <strong>Status</strong>
            <strong>Priority</strong>
            <strong>Time to Close</strong>
            <strong>Sales Agent</strong>
            <strong>Actions</strong>
            </div>
            <div className={classes['grid-details']}>
            {filterLeads.map(el=>(
                <>
                <p>{el.name}</p>
                <p>{el.status}</p>
                <p>{el.priority}</p>
                <p>{el.timeToClose}</p>
                <p>{el.salesAgent.name}</p>
                <Link to={`/leads/details/${el._id}`} className={classes['details-link']}>Details</Link>
                </>
            ))}
            {filterLeads.length===0 && <p>No leads found!</p>}
            </div>
            </div>
            </div>
        </div>
    )
}
export default LeadsPage;