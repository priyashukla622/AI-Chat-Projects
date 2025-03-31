import React from "react";
import { FiSend, FiMic, FiMenu, FiUser } from "react-icons/fi";
import "./UiPage.css";

function UiPage() {
  return (
    <div className="chat-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <button className="menu-btn">
            
          <FiMenu />
        </button>
        <ul>
          <li>Home</li>
          <li>Privacy</li>
          <li>Activity</li>
          <li>Settings</li>
          <li>Help</li>
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
