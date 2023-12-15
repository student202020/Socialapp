import React from "react"
import {  useGlobalContext } from "../context/AuthContext"
import {useParams} from "react-router-dom"
import axios from "axios"
import "./Post.css"
import Topbar from "../components/Topbar.js"


export const Post = () => {

const {user} =  useGlobalContext()
const [post, setPost] = React.useState({})
const {id} = useParams()
const uuu = id.split(":")[1]
const PF = "http://localhost:4000/images/";

React.useEffect(() => {
    const getPost = async () => {
        try{
            const res = await axios.get(`http://localhost:4000/api/post/${uuu}`)
            setPost(res.data)
            console.log(res.data)
        }
        catch(err){console.log(err)}
       
    }
    getPost()
}, [uuu])

    return(
        <>
        <Topbar />
        <div className="post">
        <p >{post.desc}</p>
        <img  className="postImg" src={PF + post.image} />
      
       
        </div>
        </>
    )
}
export default Post