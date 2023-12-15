import React, {useState, useEffect, useReducer, useContext, createContext}  from "react"
import ContexReducer from "./ContexReducer"

const initialState = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
   
}

const AppContext = React.createContext(initialState)
const AppProvider = ({children}) =>{
const [isEditing, setIsEditing] = React.useState(false)
const [editId, setEditId] = React.useState("")
const [description, setDescription] = React.useState("")
const [state, dispatch] = React.useReducer(ContexReducer, initialState)

useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])


    return (<AppContext.Provider value={{

       ...state,
        dispatch,
        isEditing,
        setIsEditing,
        description,
        setDescription,
        editId,
        setEditId
    }}>{children}</AppContext.Provider>)
}


export const useGlobalContext = () => {
    return useContext(AppContext)
 }

 export {AppContext, AppProvider}
