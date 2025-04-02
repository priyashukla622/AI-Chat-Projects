import React, { useState } from "react";
import { FiSend, FiMic, FiMenu, FiUser, FiActivity, FiSettings, FiLogOut, FiHelpCircle, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import "./Uipage.css";

function UiPage() {
    const [collapsed, setCollapsed] = useState(false);
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showHelpOptions, setShowHelpOptions] = useState(false);
    const navigate = useNavigate();  

    const toggleSidebar = () => setCollapsed(!collapsed);
    const toggleMode = () => setDarkMode(!darkMode);
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        localStorage.removeItem("email"); 
        alert("You have logged out successfully.");
        navigate("/login");
    };

    const handleSend = () => {
        if (!message.trim()) return; 

        fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            }),
        })
        .then(res => res.json())
        .then(data => {
            const dataResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API";
            let typingText = "";
            let i = 0;

            setResponses(prevResponses => [...prevResponses, { message, response: "" }]);
            const interval = setInterval(() => {
                if (i < dataResponse.length) {
                    typingText += dataResponse[i];
                    setResponses(prevResponses => {
                        const updatedResponses = [...prevResponses];
                        updatedResponses[updatedResponses.length - 1] = { message, response: typingText };
                        return updatedResponses;
                    });
                    i++;
                } else {
                    clearInterval(interval); 
                }
            }, 200); 
            setMessage(""); 
        })
        .catch(error => console.error("Error:", error));
    };

    return (
        <div className={`chat-container ${darkMode ? "dark" : "light"}`}>
            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
                <button className="menu-btn" onClick={toggleSidebar}>
                    <FiMenu />
                </button>
                <ul>
                    <li><FiActivity style={{ marginRight: "20px" }} /> Activity</li>
                    <li onClick={() => setShowPopup(true)}><FiSettings style={{ marginRight: "20px" }} /> Settings</li>
                    <li className="help-menu" onClick={() => setShowHelpOptions(!showHelpOptions)}>
                        <FiHelpCircle style={{ marginRight: "20px" }} /> Help
                        {showHelpOptions && (
                            <ul className="help-options">
                                <li><a href="https://gemini.google.com/updates" target="_blank" rel="noopener noreferrer">Update</a></li>
                                <li><a href="https://gemini.google.com/faq" target="_blank" rel="noopener noreferrer">FAQ</a></li>
                            </ul>
                        )}
                    </li>
                    <li onClick={handleLogout}><FiLogOut style={{ marginRight: "20px" }} /> Logout</li>
                </ul>
            </aside>
            
            <div className="chat-section">
                <header className="chat-header">
                    <h2>Gemini AI</h2>
                    <FiUser className="login-icon" onClick={() => navigate("/")} />
                </header>
                
                <div className="chat-box">
                    {responses.map((chat, index) => (
                        <div key={index} className="chat-item">
                            <div className="chat-you">
                                <p><strong>You:</strong> {chat.message}</p>
                            </div>
                            <div className="chat-bot">
                                <p><strong>Bot:</strong> {chat.response}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="input-box">
                    <div className="icon-container">
                        <FiMic className="mic-icon" />
                        <label htmlFor="fileInput">
                            <FiPlus style={{ margin: "5px" }} />
                        </label>
                    </div>
                    {showPopup && (
                        <div className="setting-popup">
                            <div className="popup-content">
                                <button onClick={toggleMode}>
                                    <FontAwesomeIcon icon={faMoon} />
                                    {darkMode ? "Light Mode" : "Dark Mode"}
                                    <FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} className="toggle-icon" />
                                </button>
                                <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
                            </div>
                        </div>
                    )}
                    <input 
                        type="text" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        onKeyDown={(e) => e.key === "Enter" && handleSend()} 
                        placeholder="Type a message..." 
                    />
                    <button onClick={handleSend}>
                        <FiSend />
                    </button>
                    <input type="file" id="fileInput" style={{ display: "none" }} />
                </div>
            </div>
        </div>
    );
}

export default UiPage;