
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { Routes, Route, Navigate } from "react-router-dom"
import Searching from "./pages/Searching"
import Streaming from "./pages/Streaming"
import { useState } from "react";

const App = () => {

  const [theme, setTheme] = useState("light")

  return (
    <>
      <div className="flex justify-center pt-5 dark:bg-black">
        {theme === "light" ? 
        
        <FaMoon className="text-2xl" onClick={
          ()=>{
            setTheme("dark"); 
            document.body.classList.toggle("dark");
          }}/> : 
          
          <FaSun className="text-2xl dark:text-white" onClick={
            ()=>{
                 setTheme("light"); 
                 document.body.classList.toggle("dark");
                
                }}/>
          
          }
      </div>
    <Routes>
      
      <Route path="/" element={<Navigate to={"/search"} replace/>}/>
      <Route path="/search" element={<Searching/>}/>
      <Route path="/stream" element={<Streaming/>}/>
    </Routes>
    </>
  )
}

export default App