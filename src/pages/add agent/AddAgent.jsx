import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import classes from './AddAgent.module.css';
import { registerAgent } from "../../utils/redux/slice/agentsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const AddAgent=()=>{
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const navigateAgents=()=>{
        navigate("/agents")
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const response=await dispatch(registerAgent({name,email}));
        if(response.payload.agent){
            toast.success('Agent register succesfully.');
            setTimeout(()=>{
                navigate("/agents");
            },1000);
        }
        else{
            toast.error("Email id is already register")
        }
    }
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={classes['add-agent']}>
                <div className={classes['add-header']}>
                    <h2>Add Agent Form</h2>
                    <button onClick={navigateAgents}>Agents</button>
                </div>
                <div className={classes['add-form']}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="inputName">Name:</label><br />
                    <input type="text" id="inputName" onChange={event=>setName(event.target.value)} required/>
                    <br />
                    <label htmlFor="inputEmail">Email:</label><br />
                    <input type="email" id="inputEmail" onChange={event=>setEmail(event.target.value)} required/>
                    <br />
                    <button type="submit">Register</button>
                </form>
                </div>
            </div>
        </div>
    )
}
export default AddAgent;