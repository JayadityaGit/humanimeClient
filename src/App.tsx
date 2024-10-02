

import { Routes, Route, Navigate } from "react-router-dom"
import Searching from "./pages/Searching"
import Streaming from "./pages/Streaming"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/search"} replace/>}/>
      <Route path="/search" element={<Searching/>}/>
      <Route path="/stream" element={<Streaming/>}/>
    </Routes>
  )
}

export default App