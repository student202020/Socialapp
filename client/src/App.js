import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Post from "./pages/Post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useGlobalContext } from "./context/AuthContext";

function App() {
  const { user } = useGlobalContext();
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={user ? <Home /> : <Login />}/>
    <Route path="/register" element= {user ? <Home /> : <Register />}/>   
    <Route path="/profile/:id" element= { <Profile />}/> 
    <Route path="/post/:id" element= { <Post />}/>     
        </Routes>
        </BrowserRouter>
  );
}

export default App;