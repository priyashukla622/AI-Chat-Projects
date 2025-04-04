import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WelcomePage from "./Components/Welcome";
import UiPage from "./Components/UiPage";
import Login from "./Components/LogIn";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <>
   
    <Router>
      <Routes>

        <Route path="/" element={<WelcomePage />} />  
        <Route path="/" element={<UiPage />} /> 
        <Route path="/ui" element={<UiPage />} /> 
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}
export default App;







