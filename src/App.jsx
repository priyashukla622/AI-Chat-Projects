import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import ModeToggle from "./Components/ModeToggle";
import UiPage from "./Components/UiPage";


function App() {
  return (
    <>
    <Router>
    <UiPage/>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    <ModeToggle/>
    </>
  );
}
export default App;






