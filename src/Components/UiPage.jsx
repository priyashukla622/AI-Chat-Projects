// import React from "react";
// import { FiSend, FiMic, FiMenu,  FiUser,  FiActivity, FiSettings, FiHelpCircle, FiPlus  } from "react-icons/fi";
// import { useState } from "react";
// import "./UiPage.css"; 

// function UiPage() {
//     const [collapsed, setCollapsed] = useState(false)
//     const [message, setMessage] = useState("");
//     const [responses, setResponses] = useState([]);

//     const toggleSidebar = () =>{
//       if (collapsed){
//         setCollapsed(false)
//       }
//       else{
//         setCollapsed(true)
//       }
//     }

//     const handleSend = () => {
//       if (!message.trim()) return; // Prevent sending empty messages

//       fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCHW1OXkJKoP7DeA9SyP17Qkua9Synvkfs", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//               contents: [{ parts: [{ text: message }] }]
//           }),
//       })
//       .then(res => res.json())
//       .then(data => {
//           console.log("API Response:", data);
//           const dataResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API";
//           let typingText = "";
//           let i = 0;
//           // Fix: Initialize empty response before typing starts
//           setResponses(prevResponses => [...prevResponses, { message, response: "" }]);

//           const interval = setInterval(() => {
//               if (i < dataResponse.length) {
//                   typingText += dataResponse[i];
//                   setResponses(befResponses => {
//                       const updtResponses = [...befResponses];
//                       updtResponses[updtResponses.length - 1] = { message, response: typingText };
//                       return updtResponses;
//                   });
//                   i++;
//               }
//                else {
//                   clearInterval(interval); // Stop interval when full text is displayed
//               }
//           },200); // Adjust speed here
//           setMessage(""); // Clear input field
//       })
//       .catch(error => console.error("Error:", error));
//   };

//     const renderResponses = () => {
//       return responses.map((chat, index) => (
//           <div key={index} className="chat-item">
//               <div className="chat-you">
//                   <p className="you"><strong>You:</strong> {chat.message}</p>
//               </div>
  
//               <div className="chat-bot">
//                   <p className="bot"> <strong>Bot:</strong>{chat.response}</p>
//               </div>
//           </div>
//       ));
//   };

//   return (
//     <div className="chat-container">
//       {/* Sidebar */}
//       <aside  className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//         <button className="menu-btn" onClick={toggleSidebar}>
//           <FiMenu />
//         </button>
//         <ul>
//           <li><span><FiActivity  style={{marginRight:'20px'}}/></span> Activity</li>
//           <li><span><FiSettings style={{marginRight:'20px'}}/></span> Settings</li>
//           <li><span><FiHelpCircle style={{marginRight:'20px'}}/></span> Help</li>
//         </ul>
//       </aside>
//       {/* Chat Section */}
//         <div className="chat-section">
//             <header className="chat-header">
//                 <h2>Gemini AI</h2>
//                 <FiUser className="login-icon" />
//             </header>

//             <div className="chat-box">
//                   {renderResponses()}
//             </div>

//             {/* Input Section */}
//             <div className="input-box">
//               <div className="icon-container">
//                 <FiMic className="mic-icon" />
//                 <label htmlFor="fileInput" >
//                       <FiPlus  style={{margin:'5px'}}/>
//                 </label>
//               </div>

//               <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
//               <button  onClick={handleSend}>
//                 <FiSend />
//               </button>

//               <input type="file" id="fileInput" style={{ display: 'none' }} />
//             </div>
//       </div>
//     </div>
//   );
// }
// export default UiPage;







import React from "react";
import { FiSend, FiMic, FiMenu, FiUser, FiActivity, FiSettings, FiLogOut, FiHelpCircle, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after logout
import "./UiPage.css"; 

function UiPage() {
    const [collapsed, setCollapsed] = useState(false);
    const [message, setMessage] = useState("");
    const [responses, setResponses] = useState([]);
    const navigate = useNavigate();  // Initialize the useNavigate hook

    const toggleSidebar = () => {
      setCollapsed(!collapsed); // Toggle sidebar collapsed state
    };

    const handleSend = () => {
      if (!message.trim()) return; // Prevent sending empty messages

      fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY", {
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
          }, 200); // Adjust speed here
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

    // Logout function to clear token and navigate to login
    const handleLogout = () => {
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem("email"); // Remove email from localStorage
      alert("You have logged out successfully.");
      navigate("/login"); // Navigate to login page after logout
    };
    return (
      <div className="chat-container">
        {/* Sidebar */}
        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <button className="menu-btn" onClick={toggleSidebar}>
            <FiMenu />
          </button>
          <ul>
            <li><span><FiActivity style={{marginRight:'20px'}} /></span> Activity</li>
            <li><span><FiLogOut style={{ marginRight: '20px' }} onClick={handleLogout} /></span> Logout</li> {/* Added onClick handler for logout */}
            <li><span><FiSettings style={{marginRight:'20px'}} /></span> Settings</li>
            <li><span><FiHelpCircle style={{marginRight:'20px'}} /></span> Help</li>
          </ul>
        </aside>

        {/* Chat Section */}
        <div className="chat-section">
          <header className="chat-header">
            <h2>Gemini AI</h2>
            <FiUser className="login-icon" />
          </header>

          <div className="chat-box">
            {renderResponses()}
          </div>

          {/* Input Section */}
          <div className="input-box">
            <div className="icon-container">
              <FiMic className="mic-icon" />
              <label htmlFor="fileInput">
                <FiPlus style={{margin:'5px'}} />
              </label>
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
            <button onClick={handleSend}>
              <FiSend />
            </button>

            <input type="file" id="fileInput" style={{ display: 'none' }} />
          </div>
        </div>
      </div>
    );
}

export default UiPage;








// import React from "react";
// import { FiSend, FiMic, FiMenu,  FiUser,  FiActivity, FiSettings,FiLogOut, FiHelpCircle, FiPlus  } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./UiPage.css"; 

// function UiPage() {
//     const [collapsed, setCollapsed] = useState(false)
//     const [message, setMessage] = useState("");
//     const [responses, setResponses] = useState([]);
//     const navigate = useNavigate(); 

//     const toggleSidebar = () =>{
//       if (collapsed){
//         setCollapsed(false)
//       }
//       else{
//         setCollapsed(true)
//       }
//     }

//     const handleSend = () => {
//       if (!message.trim()) return; // Prevent sending empty messages

//       fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCHW1OXkJKoP7DeA9SyP17Qkua9Synvkfs", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//               contents: [{ parts: [{ text: message }] }]
//           }),
//       })
//       .then(res => res.json())
//       .then(data => {
//           console.log("API Response:", data);
//           const dataResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API";
//           let typingText = "";
//           let i = 0;
//           // Fix: Initialize empty response before typing starts
//           setResponses(prevResponses => [...prevResponses, { message, response: "" }]);

//           const interval = setInterval(() => {
//               if (i < dataResponse.length) {
//                   typingText += dataResponse[i];
//                   setResponses(befResponses => {
//                       const updtResponses = [...befResponses];
//                       updtResponses[updtResponses.length - 1] = { message, response: typingText };
//                       return updtResponses;
//                   });
//                   i++;
//               }
//                else {
//                   clearInterval(interval); // Stop interval when full text is displayed
//               }
//           },200); // Adjust speed here
//           setMessage(""); // Clear input field
//       })
//       .catch(error => console.error("Error:", error));
//   };

//     const renderResponses = () => {
//       return responses.map((chat, index) => (
//           <div key={index} className="chat-item">
//               <div className="chat-you">
//                   <p className="you"><strong>You:</strong> {chat.message}</p>
//               </div>
  
//               <div className="chat-bot">
//                   <p className="bot"> <strong>Bot:</strong>{chat.response}</p>
//               </div>
//           </div>
//       ));
//   };
//     // Logout function to clear token and navigate to login
//     const handleLogout = () => {
//       localStorage.removeItem("token"); // Remove token from localStorage
//       localStorage.removeItem("email"); // Remove email from localStorage
//       alert("You have logged out successfully.");
//       navigate("/login"); // Navigate to login page after logout
//     };
//   return (
//     <div className="chat-container">
//       {/* Sidebar */}
//       <aside  className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//         <button className="menu-btn" onClick={toggleSidebar}>
//           <FiMenu />
//         </button>
//         <ul>
//           <li><span><FiActivity  style={{marginRight:'20px'}}/></span> Activity</li>
//           <li><span><FiLogOut style={{ marginRight: '20px' }} onClick={handleLogout} /></span> Logout</li>
//           <li><span><FiSettings style={{marginRight:'20px'}}/></span> Settings</li>
//           <li><span><FiHelpCircle style={{marginRight:'20px'}}/></span> Help</li>
//         </ul>
//       </aside>
//       {/* Chat Section */}
//         <div className="chat-section">
//             <header className="chat-header">
//                 <h2>Gemini AI</h2>
//                 <FiUser className="login-icon" />
//             </header>

//             <div className="chat-box">
//                   {renderResponses()}
//             </div>

//             {/* Input Section */}
//             <div className="input-box">
//               <div className="icon-container">
//                 <FiMic className="mic-icon" />
//                 <label htmlFor="fileInput" >
//                       <FiPlus  style={{margin:'5px'}}/>
//                 </label>
//               </div>

//               <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
//               <button  onClick={handleSend}>
//                 <FiSend />
//               </button>

//               <input type="file" id="fileInput" style={{ display: 'none' }} />
//             </div>
//       </div>
//     </div>
//   );
// }
// export default UiPage;





