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
    </div>
  );
}

export default UiPage;
