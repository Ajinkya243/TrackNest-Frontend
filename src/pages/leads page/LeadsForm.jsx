import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import classes from './LeadsForm.module.css';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLead, updateLead } from "../../utils/redux/slice/leadsSlice";
import { toast } from "react-toastify";
const LeadsForm=()=>{
    const location=useLocation();
    const dispatch=useDispatch();
    const leadData=location.state?.lead||{};
    const {agents}=useSelector(state=>state.agents);
    const[lead,setLead]=useState({
        name:leadData.name||"",
        priority:leadData.priority||"",
        budget:leadData.budget || 0,
        source:leadData.source || "",
        salesAgent:leadData.salesAgent ? leadData.salesAgent._id : "",
        timeToClose:leadData.timeToClose || 0,
        status: leadData.status || ""
    })
    const navigate=useNavigate();
    const handleUpdate=async(event)=>{
        event.preventDefault();
        const response=await dispatch(updateLead({id:leadData._id,lead}));
        if(response.payload._id){
            toast.success("Lead Updated Succesfully");
            setTimeout(()=>{
                navigate("/leads")
            },1000)
        }
    }
    const handlePost=async(event)=>{
        event.preventDefault();
        const response=await dispatch(addLead(lead));
        if(response.data){
            setLead({});
            toast.success("Lead added succesfully.")
            navigate("/leads")
        }
        
    }
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={classes['form']}>
            {leadData.name ? <h2>Edit Lead </h2> : <h2>Add new Lead</h2>}
            <form className={classes['leads-form']}>
                <label htmlFor="">Name:</label>
                <input type="text" value={lead.name} onChange={event=>setLead(prev=>({...prev,name:event.target.value}))}/>
                <br />
                <label htmlFor="">Priority:</label>
                <select name="" id="" value={leadData.priority} onChange={event=>setLead(prev=>({...prev,priority:event.target.value}))}>
                    <option value="">Select Anyone Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <br />
                <label htmlFor="">Budget:</label>
                <input type="text" value={lead.budget} onChange={event=>setLead(prev=>({...prev,budget: +event.target.value }))}/>
                <br />
                <label htmlFor="">Source:</label>
                <select name="" value={lead.source} id="" onChange={event=>setLead(prev=>({...prev,source:event.target.value}))}>
                    <option value="">Select anyone Source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                </select>
                <br />
                <label htmlFor="">Sales Agent:</label>
                <select name="" value={lead.salesAgent} id="" onChange={event=>setLead(prev=>({...prev,salesAgent:event.target.value}))}>
                    <option value="">Select Sales Agent</option>
                    {agents.map(el=>(
                        <option value={el._id}>{el.name}</option>
                    ))}
                </select>
                <br />
                <label htmlFor="">Time to Close:</label>
                <input type="text" value={lead.timeToClose} onChange={event=>setLead(prev=>({...prev,timeToClose: +event.target.value}))}/>
                <br />
                <label htmlFor="">Status:</label>
                <select name="" value={lead.status} id="" onChange={event=>setLead(prev=>({...prev,status:event.target.value}))}>
                    <option value="">Select Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
                </select>
                <br />
                {leadData.name ? <button onClick={handleUpdate}>Save Changes</button>:<button onClick={handlePost}>Add Lead</button>}
            </form>
            </div>
        </div>
    )
}
export default LeadsForm;