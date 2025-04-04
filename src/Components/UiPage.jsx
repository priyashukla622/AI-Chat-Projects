import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {FiSend,FiMic,FiMenu,FiUser,FiActivity,FiSettings,FiLogOut,FiHelpCircle,FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import "./Uipage.css";

function UiPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [userInitial, setUserInitial] = useState(<FiUser />);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const updateUserInitial = () => {
      const userEmail = localStorage.getItem("email");
      if (userEmail && userEmail.length > 0) {
        setUserInitial(userEmail.charAt(0).toUpperCase());
      } else {
        setUserInitial(<FiUser />);
      }
    };

    updateUserInitial();
    window.addEventListener("emailUpdated", updateUserInitial);

    return () => {
      window.removeEventListener("emailUpdated", updateUserInitial);
    };
  }, []);

  useEffect(() => {
    if (listening && transcript) {
      setMessage(transcript);
    }
  }, [transcript, listening]);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMode = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.dispatchEvent(new Event("emailUpdated"));
    alert("You have logged out successfully.");
    navigate("/login");
  };

  const toggleMic = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      alert("Microphone Stopped");
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      alert("Microphone Started");
    }
  };
  const handleSend = () => {
    if (message.trim() === "") return;

    setResponses((prev) => [...prev, { message, response: null }]);
    const API_KEY = import.meta.env.VITE_API_URL;
    setMessage("");
    resetTranscript();

    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const dataResponse =
          data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API";
        let typingText = "";
        let i = 0;

        const interval = setInterval(() => {
          if (i < dataResponse.length) {
            typingText += dataResponse[i];
            setResponses((prevResponses) => {
              const updated = [...prevResponses];
              updated[updated.length - 1] = {
                ...updated[updated.length - 1],
                response: typingText,
              };
              return updated;
            });
            i++;
          } else {
            clearInterval(interval);
          }
        }, 30);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : "light"}`}>
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button className="menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <ul>
          <li>
            <a
              href="https://myactivity.google.com/product/gemini?utm_source=gemini"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}
            >
              <FiActivity style={{ marginRight: "20px" }} /> Activity
            </a>
          </li>
          <li onClick={() => setShowPopup(true)}>
            <FiSettings style={{ marginRight: "20px" }} /> Settings
          </li>
          <li className="help-menu" onClick={() => setShowHelpOptions(!showHelpOptions)}>
            <FiHelpCircle style={{ marginRight: "20px" }} /> Help
            {showHelpOptions && (
              <ul className="help-options">
                <li>
                  <a href="https://gemini.google.com/updates" target="_blank" rel="noopener noreferrer">
                    Update
                  </a>
                </li>
                <li>
                  <a href="https://gemini.google.com/faq" target="_blank" rel="noopener noreferrer">
                    FAQ
                  </a>
                </li>
              </ul>
            )}
          </li>
          <li onClick={handleLogout}>
            <FiLogOut style={{ marginRight: "20px" }} /> Logout
          </li>
        </ul>
      </aside>
      <div className="chat-section">
        <header className="chat-header">
          <h2>Gemini AI</h2>
          <div className="user-icon" onClick={() => navigate("/signUp")}>
            {userInitial}
          </div>
        </header>

        <div className="chat-box">
          {responses.map((chat, index) => (
            <div key={index} className="chat-item">
              <div className="chat-you">
                <ReactMarkdown>{chat.message}</ReactMarkdown>
              </div>
              {chat.response !== null && (
                <div className="chat-bot">
                  <ReactMarkdown>{chat.response}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="input-box">
          <div className="icon-container">
            <FiMic
              className="mic-icon"
              onClick={toggleMic}
              style={{ cursor: "pointer", fontSize: "24px", color: listening ? "red" : "black" }}
            />
            <label htmlFor="fileInput">
              <FiPlus style={{ margin: "5px" }} />
            </label>
          </div>

          {showPopup && (
            <div className="setting-popup">
              <div className="popup-content">
                <button className="dark-btn" onClick={toggleMode}>
                  <FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} className="toggle-icon" />
                </button>
                <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
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
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileChange} />
          {selectedFile && <p>{selectedFile.name}</p>}

          <button onClick={handleSend}>
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}
export default UiPage;

















