import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { fetchLeads, pipelineLeads } from './utils/redux/slice/leadsSlice';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(fetchLeads());
    dispatch(pipelineLeads());
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
