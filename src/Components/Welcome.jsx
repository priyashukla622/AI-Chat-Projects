import React from "react";
import { useNavigate } from "react-router-dom";
import './Welcome.css'

const WelcomePage = () => {
    const navigate = useNavigate()



    return (
      <div className="welcome-container">
        <h1 className="welcome-title">Meet 
          <span className="ge"> Ge</span>
          <span className="text-m">m</span>
          <span className="ini">ini</span>
          ,<br></br>
        your personal AI assistant</h1>
        <p className="welcome-text">How can I help you?</p>
        <p className="welcome-instruction">
          If you are a new user, please Sign Up; otherwise, Login.
        </p>
  
        <div className="button-group">
          <button className="get-start" onClick={()=> navigate("/ui")}>Get Start</button>
        </div>
      </div>
    );
  };
  
  export default WelcomePage;