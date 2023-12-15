import React, {useState, useEffect} from "react"
import { useGlobalContext } from "../context/AuthContext"
import { useParams } from "react-router-dom"
import axios from "axios"
import Topbar from "../components/Topbar.js"
import Rightbar from "../components/Rightbar.js"
import "./Profile.css"

export const Profile = () => {


const {id} = useParams();
const uuu = id.split(":")[1]
const {user: currentUser, dispatch} = useGlobalContext()
const [user, setUser] = React.useState({});
const [users, setUsers] = React.useState([]);
const [friends, setFriends] = React.useState([]);
const [followed, setFollowed] = React.useState(
    currentUser?.followings.includes(uuu)
  );
  const PF = "http://localhost:4000/images/";

    
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user/" + uuu);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [uuu])

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/user");
        setUsers(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, [])

  React.useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/user/friends/${uuu}`); 
        setFriends(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [uuu])


  const handleClick = async () => {
    try {
      if (followed) {
        
        await axios.put(`http://localhost:4000/api/user/unfollow/${uuu}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: uuu });
      
      
      } else {
       
        await axios.put(`http://localhost:4000/api/user/follow/${uuu}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: uuu });
      
        }
    }catch (err) {console.log(err)}
    setFollowed(!followed);
  };



  
  
    return(
        <>
   <Topbar />
      <div className="profile">
        <Rightbar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.imagec !== " "
                    ? PF + user.imagec
                    : PF + "cover.jpeg"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.image
                    ? PF + user.image
                    : PF + "like.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
            {user && <h5 className="profileInfoName">{user.name}</h5>}
            {user && <p className="profileInfoName">{user.username}</p>}
            {user && <p className="profileInfoDesc">{user.desc}</p>}
            {user && <h6 className="profileInfoName">{user.city}</h6>}
            {(currentUser &&  (currentUser._id !== user._id)) && <button  className="shareProfileButton" onClick={handleClick}>{followed ? "unfollow": "follow"}</button>}
            </div>
            </div>

      <div className="profileInfo">
      <h4> {` ${user.name} has ${friends.length} friends`}</h4>
        {friends.map(item => {
         var u = users.find(item1 => item1._id === item._id)
            return(<div className="profileFriends"> 
              <p>{u.username}</p>
      </div>)
        })}
      </div>
      </div>
      </div>
    
        
        </>
    )
}
export default Profile