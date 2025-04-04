import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './utils/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './utils/redux/store/store';
import GlobalStateProvider from './utils/context/GlobalStateProvider';
import LeadsPage from './pages/leads page/LeadsPage';
import AgentsPage from './pages/agents page/AgentsPage';
import SalesPage from './pages/sales page/SalesPage';
import ReportPage from './pages/report page/ReportPage';
import AddAgent from './pages/add agent/AddAgent';
import {ToastContainer} from 'react-toastify';
import Login from './pages/login page/Login';
import Profile from './pages/profile page/Profile';
import AgentDetails from './pages/agents page/AgentDetails';
import LeadsDetails from './pages/leads page/LeadsDetails';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}> 
      <GlobalStateProvider>
    <Routes> 
      <Route path="/" element={<App/>}/>
      <Route path="/leads" element={<LeadsPage/>}/>
      <Route path="/agents" element={<AgentsPage/>} />
      <Route path="/sales" element={<SalesPage/>}/>
      <Route path="/report" element={<ReportPage/>} />
      <Route path="/add-agent" element={<AddAgent/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/agents/details" element={<AgentDetails/>} />
      <Route path="/leads/details/:id" element={<LeadsDetails/>} />
    </Routes>
    </GlobalStateProvider>
    </PersistGate>
    </Provider>
    </BrowserRouter>
    <ToastContainer/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
