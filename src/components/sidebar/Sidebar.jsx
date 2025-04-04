import classes from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney , faUsers, faHeadphones, faChartLine, faChartSimple} from '@fortawesome/free-solid-svg-icons';
import { useGlobalState } from '../../utils/context/GlobalStateProvider';
import { Link } from 'react-router-dom';
const Sidebar=()=>{
    const{tab}=useGlobalState();
    return(
        <div className={classes.sidebar}>
        <Link to="/" className={tab==='dashboard'?classes.active:''}>
        <FontAwesomeIcon icon={faHouseChimney} size="xl" style={{color: "#74C0FC",}} />
        <p><strong>Home</strong></p>
        </Link>
        <Link to="/leads" className={tab==='leads'?classes.active:''}>
        <FontAwesomeIcon icon={faUsers} size="xl" style={{color: "#74C0FC",}}  />
        <p><strong>Leads</strong></p>
        </Link>
        <Link to="/agents" className={tab==='agents'?classes.active:''}>
        <FontAwesomeIcon icon={faHeadphones} size="xl" style={{color: "#74C0FC",}} />
        <p><strong>Agents</strong></p>
        </Link>
        <Link to="/sales" className={tab==='sales'?classes.active:''}>
        <FontAwesomeIcon icon={faChartLine} size="xl" style={{color: "#74C0FC",}} />
        <p><strong>Sales</strong></p>
        </Link>
        <Link to="/report" className={tab==='report'?classes.active:''}>
        <FontAwesomeIcon icon={faChartSimple} size="xl" style={{color: "#74C0FC",}} />
        <p><strong>Reports</strong></p>
        </Link>
        </div>
    )
}
export default Sidebar;