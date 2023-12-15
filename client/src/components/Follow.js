import React from "react"
import {  useGlobalContext } from "../context/AuthContext"
import axios from "axios"
import "./Follow.css"


export const Follow = ({user}) => {

const {user: currentUser, dispatch } =  useGlobalContext()
const [followed, setFollowed] = React.useState(
    currentUser?.followings.includes(user?._id)
  );
  const handleClick = async () => {
    try {
      if (followed) {
        
        await axios.put(`http://localhost:4000/api/user/unfollow/${user._id}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      
      
      } else {
       
        await axios.put(`http://localhost:4000/api/user/follow/${user._id}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      
        }
    }catch (err) {console.log(err)}
    setFollowed(!followed);
  };


    return(
        <>
  
       {(currentUser && (currentUser._id !== user._id)) && <button className="followButton" onClick={handleClick}>{followed ? "unfollow": "follow"}</button>}
        </>
       
    )
}
export default Follow