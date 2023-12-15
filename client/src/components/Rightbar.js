import React from "react"
import {  useGlobalContext } from "../context/AuthContext"
import {Link} from "react-router-dom"
import Follow from "./Follow"
import axios from "axios"
import "./Rightbar.css"

export const Rightbar = () => {
const [users, setUsers] = React.useState([])
const {user} =  useGlobalContext()
const PF = "http://localhost:4000/images/";

React.useEffect(() => {
const fetchUsers = async() => {
    const res = await axios.get("http://localhost:4000/api/user")
    setUsers(res.data.filter(item => {return item._id !== user?._id}))
    
}
fetchUsers()
}, [])


    return(
        <div className="rightbarWrapper">
        {users.length === 0  && <h2 className="text">Welcome to Socialapp network, give it a try !</h2>}
        <img className="coverImage" src="http://localhost:4000/images/social.jpeg" alt="Coverimage" />
        {user ? <h2 className="text">My Online friends</h2> : <h2 className="text">Socialapp network</h2>}
        
         {users.map(item => {
            return(<div>
                <ul className="rightbarFriendList">
                    <li >

            <div className="follow">
            <div className="start">
            <img
            className="shareProfileImg"
            src={PF + item.image}            
            alt=""
          />
         <Link to={`/profile/:${item._id}`}>{item.username}</Link>
         </div>
         <div className="end">
         <Follow user={item}/>
         </div>
          </div>
            
           
            </li>
            </ul>
            </div>)
        })}
        </div>
       
    )
}
export default Rightbar