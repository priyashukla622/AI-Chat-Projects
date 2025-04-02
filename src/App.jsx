import React from "react";
import UiPage from "./Components/UiPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import ModeToggle from "./Components/ModeToggle";


function App() {
  return (
    <>
   
    <Router>
    <UiPage/>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ModeToggle" element={<ModeToggle/>}/>
      </Routes>
    </Router>
    {/* <ModeToggle/> */}
    </>
  );
}
export default App;






