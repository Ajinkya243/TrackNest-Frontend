import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import classes from './Login.module.css';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAgent, setCurrentAgent } from "../../utils/redux/slice/agentsSlice";
import { toast } from "react-toastify";
const Login=()=>{
    const navigate=useNavigate();
    const navigateDashBoard=()=>{
        navigate("/");
    }
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const testAgent={name:"Ajinkya G.",email:"ajinkyaG@test.com"}
    const dispatch=useDispatch();
    const handleTestCrendentials=()=>{
        setName(testAgent.name);
        setEmail(testAgent.email);
    }
    const handleLogin=async(event)=>{
        event.preventDefault();
        const response=await dispatch(loginAgent({name,email}));
        if(response.payload?._id){
            toast.success("Login Sucesfully")
            dispatch(setCurrentAgent({id:response.payload._id,name,email}))
            setTimeout(()=>{
                navigate("/")
            },1500)
        }
        else{
            toast.error("Invalid Credentials")
        }
    }
    return(
        <div>
           <Navbar/>
           <Sidebar/> 
           <div className={classes['login-page']}>
            <div className={classes['login-header']}>
            <h2>Agent Login Page</h2>
            <button onClick={navigateDashBoard}>Return To Dashboard</button>
            </div>
           
           <div className={classes['agent-login']}>
            <form>
                <label htmlFor="inputName">Name:</label><br />
                <input type="text" id="inputName" value={name} onChange={event=>setName(event.target.value)}/><br />
                <label htmlFor="inputEmail">Email:</label><br />
                <input type="email" id="inputEmail" value={email} onChange={event=>setEmail(event.target.value)}/><br />
                <button onClick={handleLogin}>Login</button>
            </form>
            <button onClick={handleTestCrendentials}>Use Test Crendentials</button>
           </div>
           </div>
        </div>
    )
}
export default Login;