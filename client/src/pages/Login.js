import React from "react"
import {useNavigate} from "react-router-dom"
import { loginCall } from "../context/apiCalls";
import { useGlobalContext } from "../context/AuthContext"
import "./Login.css"


export const Login = () => {

const[user, setUser] = React.useState({
    username:"",
    password:"",

})
const {dispatch} = useGlobalContext()
const navigate = useNavigate()

const handleState = (e) => {
    e.preventDefault()
    setUser(prevValue => ({...prevValue, [e.target.name]: e.target.value }))
}
const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      user,
      dispatch
    );

    navigate("/")

  };


    return(
      <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Sopcialapp</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Sopcialapp.
          </span>
        </div>
        <div className="loginRight">

       <form  className="loginBox" onSubmit={handleSubmit}>
        
       <input
       type= "text"
       className="loginInput"
       placeholder="enter username"
       name="username"
       onChange={handleState}
       />
    
       <input
       type= "text"
       className="loginInput"
       placeholder="enter password"
       name="password"
       onChange={handleState}
       />

      <button className="loginButton"  type="submit">Login</button>

      </form>
      </div>
      </div>
    </div>
    )
}
export default Login