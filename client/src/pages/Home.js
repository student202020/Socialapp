import React from "react"
import {  useGlobalContext } from "../context/AuthContext"
import Topbar from "../components/Topbar"
import Feed from "../components/Feed"
import Rightbar from "../components/Rightbar"
import Leftbar from "../components/Leftbar"
import "./Home.css"

export const Home = () => {




    return(
      <div >
      <Topbar />
      <div className="homeWrapper">
      <Leftbar />
      <Feed />
      <Rightbar />
    
      </div>
       
        </div>
    )
}
export default Home