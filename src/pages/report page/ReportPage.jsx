import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import classes from './ReportPage.module.css';
import { useGlobalState } from "../../utils/context/GlobalStateProvider";
import {Chart as Chartjs,ArcElement, Tooltip, Legend,Title, plugins, CategoryScale,LinearScale,BarElement} from 'chart.js';
import {Doughnut, Bar} from 'react-chartjs-2'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
Chartjs.register(ArcElement, Tooltip, Legend,Title,plugins,CategoryScale,LinearScale,BarElement);

const ReportPage=()=>{
    const{setTab}=useGlobalState();
    const {leads}=useSelector(state=>state.leads);
    const closedLeads=leads.filter(el=>el.status==='Closed');
    const navigate=useNavigate();
    const{currentAgent}=useSelector(state=>state.agents);
    const navigateSale=()=>{
        navigate("/sales");
        if(!currentAgent.name || !currentAgent.email){
            navigate("/login");
        }
    }
    const donughtChartData={
        labels:['Closed','Pipeline'],
        datasets:[{
            label:'Total Leads',
            data:[closedLeads.length,leads.length-closedLeads.length],
            backgroundColor:[
                "'rgba(247, 7, 59, 0.2)'","rgba(4, 155, 255, 0.2)"
            ],
            borderColor:[
                "rgba(255, 0, 55, 0.2)","rgba(0, 153, 255, 0.2)"
            ],
            borderWidth:1
    }]
    }
    const donughtChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
            title: {
                display: true,
                text: 'Total Leads (Closed vs In Pipeline)',
                font: { size: 16 },
                padding: { top: 10, bottom: 10 },
                color:'#333'
            }
        }
    };
    const barChartData={
        labels:leads.map(el=>el.name),
        datasets:[{
            label:'Leads Budget',
            data:leads.map(el=>el.budget)}],
            borderWidth:1
    }
    const barChartOptions={
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            title: {
                display: true,
                text: 'Budget Of Each Lead',
                font: { size: 16 },
                padding: { top: 10, bottom: 10 },
                color:'#333'
            }
        }
    }
    useEffect(()=>{
        setTab('report');
    },[])
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={classes['report-page']}>
            <div className={classes['report-header']}>
            <h2>Reports</h2>
            <button onClick={navigateSale}>Sales</button>
            </div>
            <div className={classes.chart}>
            <div className={classes.donught}>
                <Doughnut data={donughtChartData} options={donughtChartOptions}/>
            </div>
            <div className={classes.bar}>
            <Bar data={barChartData} options={barChartOptions}/>
            </div>
            </div>
            </div>
        </div>
    )
}
export default ReportPage;