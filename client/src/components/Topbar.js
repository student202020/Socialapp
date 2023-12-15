import React from "react"
import {Link, useNavigate} from "react-router-dom"
import { useContext } from "react";
import { useGlobalContext } from "../context/AuthContext"
import "./Topbar.css"



export const Topbar = () => {
const { user, dispatch } = useGlobalContext();
const PF = "http://localhost:4000/images/";

const navigate = useNavigate()

const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/")
  };

    return(
   <div className="topbarWrapper">
   <Link  className="topbarLeft" to="/"><h2>Socialapp</h2></Link>
   <div className="topbarRight">
   {!user && <div className="topbarRightItems"><Link className="item" to="/login"><p>Login</p></Link><Link className="item" to="/register"><p className="item">Register</p></Link></div>}
   
   {user && <div className="topbarRightItems">
    <Link to={`/profile/:${user._id}`}><img  className="itemImage" src={PF + user.image} alt="slika" /></Link>

   <p className="item" onClick={handleLogout}>Logout</p>
   
   </div>}
   </div>
  </div>
    )
}
export default Topbar