import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { fetchLeads, pipelineLeads } from './utils/redux/slice/leadsSlice';
import Dashboard from './components/Dashboard/Dashboard';
import { fetchAgents } from './utils/redux/slice/agentsSlice';

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchLeads());
    dispatch(pipelineLeads());
    dispatch(fetchAgents());
  })
  return(
    <>
    <Navbar/>
    <Sidebar/>
    <Dashboard/>
    </>
  )
}

export default App;
