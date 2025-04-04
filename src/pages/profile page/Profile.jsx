import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import classes from './Profile.module.css';
import { setCurrentAgent } from "../../utils/redux/slice/agentsSlice";
import { toast } from "react-toastify";
const Profile=()=>{
    const{currentAgent}=useSelector(state=>state.agents);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogout=()=>{
        dispatch(setCurrentAgent({}));
        toast.success('Logout Succesfully.');
        setTimeout(()=>{
            navigate("/login")
        },1500)
    }
        useEffect(()=>{
        if(!currentAgent.name || !currentAgent.email){
            navigate("/login")
        }
       
    })
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={classes['profile-page']}>
            <h2>Welcome back {currentAgent.name}</h2>
            <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
export default Profile;