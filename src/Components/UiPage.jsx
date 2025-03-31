import React from "react";
import { FiSend, FiMic, FiMenu,  FiUser,  FiActivity, FiSettings, FiHelpCircle } from "react-icons/fi";
import { useState } from "react";
import "./UiPage.css"; 

function UiPage() {
    const [collapsed, setCollapsed] = useState(false)

    const toggleSidebar = () =>{
      if (collapsed){
        setCollapsed(false)
      }
      else{
        setCollapsed(true)
      }
    }


  return (
    <div className="chat-container">
      {/* Sidebar */}
      <aside  className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button className="menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <ul>
          <li><span><FiActivity  style={{marginRight:'20px'}}/></span> Activity</li>
          <li><span><FiSettings style={{marginRight:'20px'}}/></span> Settings</li>
          <li><span><FiHelpCircle style={{marginRight:'20px'}}/></span> Help</li>
        </ul>
      </aside>

      {/* Chat Section */}
        <div className="chat-section">
            <header className="chat-header">
                <h2>Gemini AI</h2>
                <FiUser className="login-icon" />
            </header>

            <div className="chat-box">
                <div className="message bot">Hello! I'm Gemini AI. How can I assist you?</div>
                <div className="message user">Hi, I need help with something.</div>
                <div className="message bot">Sure! Please tell me more.</div>
            </div>

            {/* Input Section */}
            <div className="input-box">
                <FiMic className="mic-icon" />
                <input type="text" placeholder="Type a message..." />
                <button>
                    <FiSend />
                </button>
            </div>
      </div>
    </div>

  );
}

export default UiPage;
