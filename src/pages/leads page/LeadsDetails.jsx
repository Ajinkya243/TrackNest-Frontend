import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import classes from './LeadsDetails.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getLeadById } from "../../utils/redux/slice/leadsSlice";
import { useParams, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { getCommentById, postComment } from "../../utils/redux/slice/commentsSlice";

const LeadsDetails=()=>{
    const{id}=useParams();
    const dispatch=useDispatch();
    const{lead,status}=useSelector(state=>state.leads);
    const{comments}=useSelector(state=>state.comments);
    const{currentAgent}=useSelector(state=>state.agents);
    const[text,setText]=useState("");
    const filteredComments=comments.filter(el=>el.lead===id);
    const clearText=()=>{
        setText("");
    }
    const handlePostComment=()=>{
        dispatch(postComment({lead:id,author:currentAgent.id,commentText:text}));
        setText("");
    }
    
    useEffect(()=>{
        dispatch(getLeadById(id));
        dispatch(getCommentById(id));
    },[])
    return(
        <div>
            <Navbar/>
            <Sidebar/>
            <div className={classes['leads-details']}>
            <div className={classes['details-header']}>
            <h2>Leads Details</h2>
            <button>Leads</button>
            </div>
            <div className={classes['details-page']}>
                {status==='pending' && <div className={classes.loader}><ClipLoader/></div>}
            {lead._id && status!=='pending' && <div className={classes.details}>
                <p><strong>Name:</strong> {lead.name}</p>
                <p><strong>Source:</strong> {lead.source}</p>
                <p><strong>Budget:</strong>{lead.budget}</p>
                <p><strong>Status:</strong> {lead.status}</p>
                <p><strong>Priority:</strong> {lead.priority}</p>
                <p><strong>Sales Agent:</strong> {lead.salesAgent.name}</p>
                <p><strong>Agent Contact Details:</strong> {lead.salesAgent.email}</p>
                <Link to="/leads/form" state={{lead}} className={classes.editBtn}>Edit Details</Link>
                <br />
                <br />
                <p><strong>Comments:</strong></p>
                <input type="text" placeholder="Enter your comment" value={text} className={classes.input} onChange={event=>setText(event.target.value)}/>
                {text && <div className={classes.btns}>
                    <button className={classes.clear} onClick={clearText}>Clear</button>
                    <button className={classes.post} onClick={handlePostComment}>Post</button>
                    </div>}
                {filteredComments.map(el=>(
                    <div className={classes.comments}>
                        <FontAwesomeIcon icon={faCircleUser} size="2xl" style={{color: "#74C0FC",}} />
                        <div>
                        <small>{el.author.name} {new Date(el.createdAt).toLocaleString('en-US')}</small>
                        <p>{el.commentText}</p>
                        </div>
                    </div>
                ))}
                </div>}
            </div>
            </div>
        </div>
    )
}
export default LeadsDetails;