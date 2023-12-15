import React from "react"
import {  useGlobalContext } from "../context/AuthContext"
import axios from "axios"
import "./Share.css"


export const Share = () => {
    const [desc, setDesc] = React.useState("");
    const [file, setFile] = React.useState(null);
    const {user, isEditing, description, editId, setEditId, setIsEditing, setDescription} =  useGlobalContext()


    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const newPost = {
          userID: user._id,
          desc: desc,
        };
        if (file) {
          const data = new FormData();
          const fileName = Date.now() + file.name;
          data.append("name", fileName);
          data.append("file", file);
          newPost.image = fileName;
          try {
            await axios.post("http://localhost:4000/api/upload", data);
          } catch (err) {}
        }
        try {
            {isEditing  ? 
           await axios.put(`http://localhost:4000/api/post/${editId}`, {...newPost, desc: description})
          :
           await axios.post("http://localhost:4000/api/post", newPost)
          
        };
        window.location.reload()
        setEditId("")
        setIsEditing(false)
        setDescription("")
        } catch (err) {}
      };  	

    return(
      <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
         <img
            className="shareProfileImg"
            src={
              user.image
                ? `http://localhost:4000/images/${user.image}`
                : "http://localhost:4000/images/heart.png"
            }
            alt="profilna"
          />
        {isEditing ?  
        <input
       type="text"
       className="shareInput"
       placeholder={description}
       name="desc"
       value={description}
       onChange={(e) => setDescription(e.target.value)}
       /> :
       <input
       type="text"
       className="shareInput"
       placeholder="enter desc"
       name="desc"
       onChange={(e) => setDesc(e.target.value)}
       />}   
        </div>   
        <div>
      
       <div className="shareBottom">
        <label htmlFor="file">
              <span> Select photo or video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
       
       
            <button className="shareButton"  onClick={handleSubmit}>{isEditing ? "Update" : "Add"}</button>
     
        </div> 
      
   
       </div> 
       </div> 
       </div>  
    )
}
export default Share