import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useGlobalState } from "../../utils/context/GlobalStateProvider";
import classes from './SalesPage.module.css';
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
const SalesPage=()=>{
    const{setTab}=useGlobalState();
    const{leads}=useSelector(state=>state.leads);
    const[inputTitle,setInputTitle]=useState("");
    const[inputSort,setInputSort]=useState("");
    const{currentAgent}=useSelector(state=>state.agents);
    const filterLeads=leads.filter(el=>(inputTitle===""||(el.name.toLowerCase().includes(inputTitle.toLowerCase())))).sort((a,b)=>{
        if(inputSort==='ascending') return a.budget-b.budget;
        if(inputSort==='descending') return b.budget-a.budget;
        return 0
    });
    const navigate=useNavigate();
    const navigateReport=()=>{
        navigate('/report')
    }
    useEffect(()=>{
        setTab('sales');
        if(!currentAgent.name || !currentAgent.email){
            navigate("/login");
        }
    })
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={classes['sales-page']}>
                {filterLeads &&<>
                <div className={classes['sales-header']}>
                <h2>Sales Overview</h2>
                <button onClick={navigateReport}>Reports</button>
                </div>
                <div className={classes.header}>
                    <input type="text" placeholder="search by lead" onChange={event=>setInputTitle(event.target.value)} />
                    <select name="" id="" onChange={event=>setInputSort(event.target.value)}>
                        <option value="">Sort By Budget</option>
                        <option value="ascending">Ascending order</option>
                        <option value="descending">Descending order</option>
                    </select>
                </div>
                <div className={classes['sales-grid']}>
                {filterLeads.map(el=>(
                   <Link className={classes['sales-link']}>
                    <h3>{el.name}</h3> 
                    <strong>Budget: <FontAwesomeIcon icon={faIndianRupeeSign} beatFade size="lg" style={{color: "#63E6BE",}} /><span> {el.budget}</span></strong>
                    <p>Time to Close: {el.timeToClose}</p>
                    <p>Sales Agent: {el.salesAgent.name}</p>
                    </Link>
                ))}
                </div>
                </>}
            </div>
        </div>
    )
}
export default SalesPage;