import React from "react";
import UiPage from "./Components/UiPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/LogIn";
import SignUp from "./Components/SignUp";


function App() {
  return (
    <>
   
    <Router>
    <UiPage/>
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}
export default App;






