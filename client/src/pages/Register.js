import React from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "./Register.css"


export const Register = () => {
const [file, setFile] = React.useState(null)
const [file1, setFile1] = React.useState(null)
const[user, setUser] = React.useState({
    name:"",
    username:"",
    password:"",
    city:"",
    desc:"",
})
const navigate = useNavigate()

const handleChange = (e) => {
    e.preventDefault()
    setUser(prevValue => ({...prevValue, [e.target.name] : e.target.value }))
    
}
const handleSubmit = async(e) => {
    e.preventDefault();

    const newUser = {
        name:user.name,
        username:user.username,
        password:user.password,
        city:user.city,
        desc:user.desc,
      };
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newUser.image = fileName;
        try {
          await axios.post("http://localhost:4000/api/upload", data);
        } catch (err) {}
      }
      
      
    try {
        await axios.post("http://localhost:4000/api/auth/register", newUser);
        console.log(newUser)
       navigate("/login")
      } catch (err) {
        console.log(err);
      }
}
    return(
        <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Socialapp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Socialapp.
          </span>
        </div>
        <div className="loginRight">

       <form className="loginBox" >
      
       <input
       type="text"
       className="loginInput"
       placeholder="enter name"
       name="name"
       onChange={handleChange}
       />
       <input
       type="text"
       className="loginInput"
       placeholder="enter username"
       name="username"
       onChange={handleChange}
       />
       <input
       type="password"
       className="loginInput"
       placeholder="enter password"
       name="password"
       onChange={handleChange}
       />
        <input
       type="text"
       className="loginInput"
       placeholder="enter desc"
       name="desc"
       onChange={handleChange}
       />
        <input
       type="text"
       className="loginInput"
       placeholder="enter city"
       name="city"
       onChange={handleChange}
       />
        <label  htmlFor="file">
        <span > Insert Profile Image   ...</span>
        <input
        style={{ display: "none" }}
        type="file"
        id="file"
        onChange={(e) => setFile(e.target.files[0])}
        />
        </label>

       <button className="loginButton"  onClick={handleSubmit}>Register</button>

      </form>
    </div>
    </div>
    </div>
    )
}
export default Register