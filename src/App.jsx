import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import "./App.css";
import UiPage from "./Components/UiPage";
function App() {
  return (
    <>
    <UiPage/>
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );

}
export default App;
