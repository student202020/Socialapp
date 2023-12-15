import React from "react"
import { useGlobalContext } from "../context/AuthContext"
import {Link} from "react-router-dom"
import Share from "./Share"
import Post from "./Post"
import axios from "axios"
import "./Feed.css"

export const Feed = () => {
const [posts, setPosts] = React.useState([])
const {user} =  useGlobalContext()

    

React.useEffect(() => {
const fetchPosts = async() => {
    try{
        const res = user ? await axios.get(`http://localhost:4000/api/post/${user._id}/friends`)
        : await axios.get("http://localhost:4000/api/post")
        setPosts(res.data)
        console.log("alma")
        console.log(res.data)
    }catch(err){console.log(err)}
   
}
fetchPosts()
}, [user])

    return(
        <div className="feedWrapper">
         {user && <Share />}
      
        
         
         {posts && posts.map(item => {
            return(<div>
              
                <Post {...item} />
            
            </div>)
        })}
        </div>
       
    )
}
export default Feed