import React from "react"
import { useGlobalContext } from "../context/AuthContext"
import {Link} from "react-router-dom"
import axios from "axios"
import "./Post.css"




export const Post = ({_id, desc, userID, image, likes}) => {
    const [like, setLike] = React.useState(likes.length);
    const [postUser, setPostUser] = React.useState({})
    const [isLiked, setIsLiked] = React.useState(false);
    const {user, setIsEditing, setDescription, setEditId} = useGlobalContext()
    const PF = "http://localhost:4000/images/";

    React.useEffect(() => {
        setIsLiked(likes.includes(user?._id));
      }, []);

 const handleDelete = async() => {
    try{
        await axios.delete(`http://localhost:4000/api/post/${_id}`, {
            data: { userId: user._id }});
       
        console.log(userID)
        console.log(user._id)
        window.location.reload()
    }catch(err){console.log(err)}
    
 }

 const handleUpdate = () => {
    setIsEditing(true)
    setDescription(desc)
    setEditId(_id)
    window.scrollTo(0,0) 
   
 }

 
const handleLike = async () => {
 setLike(isLiked ? like - 1 : like + 1);
 setIsLiked(!isLiked);
 try{
await axios.put(`http://localhost:4000/api/post/likes/${_id}`, { userId: user._id })
 }catch(err){console.log(err)}
}

React.useEffect(() => {
    const getUser = async () =>{
        const res = await axios.get(`http://localhost:4000/api/user/${userID}`)
        setPostUser(res.data)
    }
    getUser()
}, [])

    return(
        <div className="post">
        <div className="postWrapper">
        <div className="postTop">
                <div className="postTopLeft">
            <img
            className="shareProfileImg"
            src={PF + postUser.image}            
            alt=""
          />
          <p className="postText">{postUser.username}</p>
          </div>
          </div>
          <div className="postCenter">
            <p className="postText">{desc}</p>
            <Link to={`/post/:${_id}`}><img  src={PF + image} alt="www" className="postImg"/></Link>
           
            </div>
            <div className="postBottom">

            {(user && (user._id !== userID))  && <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={handleLike}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={handleLike}
              alt=""
            />
             <span className="postLikeCounter">{like} people like it</span>
            </div>}
            {!(user && (user._id !== userID))  && <span className="postLikeCounter">{like} people like it</span>}
          
          

            {(user && (user._id === userID)) && <div>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={handleUpdate}>Update</button>
                </div>
                }
       
      
        </div>
        </div>
        </div>
       
    )
}
export default Post
