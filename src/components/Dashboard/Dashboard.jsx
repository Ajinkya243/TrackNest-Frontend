import { useSelector } from 'react-redux';
import classes from './Dashboard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faUsers, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import { useGlobalState } from '../../utils/context/GlobalStateProvider';
import { useNavigate, Link } from 'react-router-dom';
const Dashboard=()=>{
    const {leads,pipeline}=useSelector(state=>state.leads);
    const{agents}=useSelector(state=>state.agents);
    const closedLead=leads.filter(el=>!pipeline.some(ele=>el._id===ele._id));
    const pipelineTotal=pipeline.reduce((acc,cur)=>acc+cur.budget,0);
    const closedTotal=closedLead.reduce((acc,cur)=>acc+cur.budget,0);
    const newLeads=leads.filter(el=>el.status==='New');
    const contactedLeads=leads.filter(el=>el.status==='Contacted');
    const qualifiedLeads=leads.filter(el=>el.status==='Qualified');
    const proposalSentLeads=leads.filter(el=>el.status==='Proposal Sent');
    const status=[{status:'New',count:newLeads.length},{status:'Contacted',count:contactedLeads.length},{status:'Qualified',count:qualifiedLeads.length},{status:'Proposal Sent',count:proposalSentLeads.length},{status:'Closed',count:closedLead.length}]
    const[priority,setPriority]=useState("High");
    const filterData=leads.filter(el=>el.priority===priority);
    const{setTab}=useGlobalState();
    const navigate=useNavigate();
    const navigateSales=()=>{
        navigate("/sales")
    }
    useEffect(()=>{
        setTab('dashboard')
    },[]);
    return(
        <div className={classes.dashboard}>
            <div>
                <h2>Dashboard</h2>
                <button className={classes['sales-btn']} onClick={navigateSales}>Sales</button>
            </div>
        <div className={classes['dashboard-tabs']}>
        <div className={classes.reports}>
            <h3>Monthly Forecast</h3>
            <p><strong><FontAwesomeIcon icon={faIndianRupeeSign} beatFade size="lg" style={{color: "#63E6BE",}} /> 22,00,000</strong></p>
            <small>Projected for this month.</small>
        </div>
        <div className={classes.reports}>
            <h3>Deals Closed</h3>
            <p><strong><FontAwesomeIcon icon={faIndianRupeeSign} beatFade size="lg" style={{color: "#63E6BE",}} /> {closedTotal}</strong></p>
            <small>Active {agents.length} agents on active {leads.length} leads.</small>
        </div>
        <div className={classes.reports}>
        <h3>Pipeline Status</h3>
        <p><strong><FontAwesomeIcon icon={faIndianRupeeSign} beatFade size="lg" style={{color: "#63E6BE",}} /> {pipelineTotal}</strong></p>
        <small>Active leads {pipeline.length} leads in pipeline</small>
        </div>
        <div className={classes.status}>
            <h3>Lead Status Overview</h3>
            <div className={classes.tabs}>
            {status.map(el=>(
                <div className={classes.type}>
                    <h4>{el.status}</h4>
                    <p>{el.count}</p>
                    </div>
            ))}
            </div>
        </div>
        </div>
        <div className={classes['quick-actions']}>
            <h3>Quick Actions</h3>
        <div className={classes['action-tab']}>
            <Link to="/add-agent">
            <FontAwesomeIcon icon={faUserPlus} size="xl" style={{color: "#74C0FC",}} />
            <p><strong>New Agent</strong></p>
            <p>Add new Agent</p>
            </Link>
            <Link to="/leads/form">
            <FontAwesomeIcon icon={faUsers} size="xl" style={{color: "#74C0FC",}} />
            <p><strong>New Lead</strong></p>
            <p>Add new Prospect</p>
            </Link>
        </div>
        </div>
        <div className={classes.filters}>
            <h2>Quick Filters</h2>
            <div className={classes['filters-btn']}>
                <div className={classes.btns}>
                <button className={`${classes['high-btn']} ${priority==='High'?classes['active-High']:''}`} onClick={()=>setPriority('High')}>High</button>
                <button className={`${classes['medium-btn']} ${priority==='Medium'?classes['active-Medium']:''}`} onClick={()=>setPriority('Medium')}>Medium</button>
                <button className={`${classes['low-btn']} ${priority==='Low'?classes['active-Low']:''}`} onClick={()=>setPriority('Low')}>Low</button>
                </div>
                <p><strong>{priority} Priority Leads</strong></p>
            </div>
            <div>
                 {filterData.map(el=>(
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <p>{el.name} ({el.source})</p>
                        <p className={classes[`active-${el.priority}`]}>{el.priority}</p>
                    </div>
                ))} 
            </div>
            
        </div>
        </div>
    )
}
export default Dashboard;