import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import classes from './Navbar.module.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar=()=>{
    const{currentAgent}=useSelector(state=>state.agents);
    const navigate=useNavigate();
    const navigateProfile=()=>{
        navigate("/profile");
    }
    return(
        <div className={classes.navbar}>
            <h2>TrackNest</h2>
            <div className={classes.faUser}>
            {currentAgent.name}<FontAwesomeIcon icon={faUser} size="xl" title="Profile" onClick={navigateProfile}/>
            </div>
        </div>
    )
}
export default Navbar;