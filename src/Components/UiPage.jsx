import React from "react";
import { FiSend, FiMic, FiMenu,  FiUser,  FiActivity, FiSettings, FiHelpCircle, FiPlus  } from "react-icons/fi";
import { useState } from "react";
import "./UiPage.css"; 

function UiPage() {
    const [collapsed, setCollapsed] = useState(false)
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState([]);

    const [showHelpOptions, setShowHelpOptions] = useState(false);
    

    const toggleSidebar = () =>{
      if (collapsed){
        setCollapsed(false)
      }
      else{
        setCollapsed(true)
      }
    }

    const handleSend = () => {
      if (!message.trim()) return; // Prevent sending empty messages

      fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCHW1OXkJKoP7DeA9SyP17Qkua9Synvkfs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              contents: [{ parts: [{ text: message }] }]
          }),
      })
      .then(res => res.json())
      .then(data => {
          console.log("API Response:", data);
          const dataResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API";
          let typingText = "";
          let i = 0;
          // Fix: Initialize empty response before typing starts
          setResponses(prevResponses => [...prevResponses, { message, response: "" }]);

          const interval = setInterval(() => {
              if (i < dataResponse.length) {
                  typingText += dataResponse[i];
                  setResponses(befResponses => {
                      const updtResponses = [...befResponses];
                      updtResponses[updtResponses.length - 1] = { message, response: typingText };
                      return updtResponses;
                  });
                  i++;
              }
               else {
                  clearInterval(interval); // Stop interval when full text is displayed
              }
          },100); // Adjust speed here
          setMessage(""); // Clear input field
      })
      .catch(error => console.error("Error:", error));
  };

    const renderResponses = () => {
      return responses.map((chat, index) => (
          <div key={index} className="chat-item">
              <div className="chat-you">
                  <p className="you"><strong>You:</strong> {chat.message}</p>
              </div>
  
              <div className="chat-bot">
                  <p className="bot"> <strong>Bot:</strong>{chat.response}</p>
              </div>
          </div>
      ));
  };

  return (
    <div className="chat-container">

      {/* Sidebar */}
      <aside  className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <button className="menu-btn" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <ul>
          <li>
            <a href="https://myactivity.google.com/product/gemini?utm_source=gemini" target="_blank" rel="noopener noreferrer" className="activity-link">
              <FiActivity className="activity-icon" />Activity 
            </a>
          </li>

          <li><span><FiSettings style={{marginRight:'20px'}}/></span> Settings</li>

          <li className="help-menu" onClick={() => setShowHelpOptions(!showHelpOptions)}>
            <span><FiHelpCircle style={{ marginRight: '20px' }} /></span> Help
            {showHelpOptions && (
              <ul className="help-options">
                <li>
                  <a href="https://gemini.google.com/updates?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024enIN_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gad_source=1&gclid=Cj0KCQjwna6_BhCbARIsALId2Z39OvbJBAcSMIwuFCL6tCeX3r9L0Fgc3HjI5VoRZJ3J_5frrAO-cogaAtlWEALw_wcB&gclsrc=aw.ds" target="_blank" rel="noopener noreferrer">Update</a>
                </li>
                <li>
                  <a href="https://gemini.google.com/faq?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024enIN_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gad_source=1&gclid=Cj0KCQjwna6_BhCbARIsALId2Z39OvbJBAcSMIwuFCL6tCeX3r9L0Fgc3HjI5VoRZJ3J_5frrAO-cogaAtlWEALw_wcB&gclsrc=aw.ds" target="_blank" rel="noopener noreferrer">FAQ</a>
                </li>
              </ul>
            )}
          </li>

        </ul>
      </aside>

      {/* Chat Section */}
        <div className="chat-section">
            <header className="chat-header">
                <h2>Gemini AI</h2>
                <FiUser className="login-icon"  />
            </header>
            
            <div className="welcome-part">
              <h1>Welcome to Gemini AI</h1>
              <p>How can I assist Today?</p>
            </div>

            <div className="chat-box">
                  {renderResponses()}
            </div>
            {/* Input Section */}
            <div className="input-box">
              <div className="icon-container">
                <FiMic className="mic-icon" />
                <label htmlFor="fileInput" >
                      <FiPlus  style={{margin:'5px'}}/>
                </label>
              </div>

              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
              <button  onClick={handleSend}>
                <FiSend />
              </button>

              <input type="file" id="fileInput" style={{ display: 'none' }} />
            </div>
      </div>
    </div>
  );
}

export default UiPage;
