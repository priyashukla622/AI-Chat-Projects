// import React, { useState } from "react";
// import { FiSend, FiMic, FiMenu, FiUser, FiActivity, FiSettings, FiLogOut, FiHelpCircle, FiPlus } from "react-icons/fi";
// import { useNavigate } from "react-router-dom"; 
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMoon } from "@fortawesome/free-regular-svg-icons";
// import { faToggleOn , faToggleOff } from "@fortawesome/free-solid-svg-icons";
// import  "./Uipage.css";
// function UiPage() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [message, setMessage] = useState("");
//     const [responses, setResponses] = useState([]);
//     const [darkMode, setDarkMode] = useState(false)
//     const [showPopup, setShowPopup] = useState(false)
//     const navigate = useNavigate();  
//     const [showHelpOptions, setShowHelpOptions] = useState(false);
    

//     const toggleSidebar = () =>{
//       if (collapsed){
//         setCollapsed(false)
//       }
//       else{
//         setCollapsed(true)
//       }
//     }

//     const handleSend = () => {
//       if (!message.trim()) return; 

//       fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY", {
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
//               else {
//                   clearInterval(interval); 
//               }

//           }, 200); 
//           setMessage(""); 
//       })
//       .catch(error => console.error("Error:", error));
//     };
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
//     };

//     const handleLogout = () => {
//       localStorage.removeItem("token"); 
//       localStorage.removeItem("email"); 
//       alert("You have logged out successfully.");
//       navigate("/login");
//     };
//     const toggleMode=()=>{
//         setDarkMode(!darkMode);
//     }
//     return (
//       <div className={`chat-container ${darkMode ? "dark": "light"}`} >
     
//         <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//           <button className="menu-btn" onClick={toggleSidebar}>
//             <FiMenu />
//           </button>
//           <ul>
//             <li><span><FiActivity style={{marginRight:'20px'}} /></span> Activity</li>
//             <li><span><FiLogOut style={{ marginRight: '20px' }} onClick={handleLogout} /></span> Logout</li> 
//             <li onClick={()=>setShowPopup(true)}><span><FiSettings style={{marginRight:'20px'}}/></span> Settings</li>
//             <li><span><FiHelpCircle style={{marginRight:'20px'}} /></span> Help</li>
//           </ul>
//         </aside>
//         <div className="chat-section">
//           <header className="chat-header">
//             <h2>Gemini AI</h2>
//             <FiUser className="login-icon" onClick={() => navigate("/")} />
//           </header>

//             <div className="chat-box">
//                   {renderResponses()}
//             </div>
//             <div className="input-box">
//               <div className="icon-container">
//                 <FiMic className="mic-icon" />
//                 <label htmlFor="fileInput" >
//                       <FiPlus  style={{margin:'5px'}}/>
//                 </label>
//               </div>
//               {showPopup &&(
//                 <div className="setting-popup">
//                 <div className="popup-content">
//                    <button onClick={toggleMode}>
//                 <FontAwesomeIcon icon={faMoon}/>
//                 {darkMode ? "Light Mode":"Dark Mode"}
//                 <FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} className="toggle-icon"/>
//                 </button>
//                    <button className="close-btn" onClick={()=>setShowPopup(false)}>Close</button>
//                 </div>
//                 </div>
//               )}
//               <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}placeholder="Type a message..." />
//               <button  onClick={handleSend}>
//                 <FiSend />
//               </button>
//             <input type="file" id="fileInput" style={{ display: 'none' }} /> 
//         </div>
//         </div>
//     </div>
//     )

//   return(
//   <>
//     <div className="chat-container">
//       {/* Sidebar */}
//       <aside  className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//         <button className="menu-btn" onClick={toggleSidebar}>
//           <FiMenu />
//         </button>
//         <ul>
//           <li>
//             <a href="https://myactivity.google.com/product/gemini?utm_source=gemini" target="_blank" rel="noopener noreferrer" className="activity-link">
//               <FiActivity className="activity-icon" />Activity 
//             </a>
//           </li>

//           <li><span><FiSettings style={{marginRight:'20px'}}/></span> Settings</li>

//           <li className="help-menu" onClick={() => setShowHelpOptions(!showHelpOptions)}>
//             <span><FiHelpCircle style={{ marginRight: '20px' }} /></span> Help
//             {showHelpOptions && (
//               <ul className="help-options">
//                 <li>
//                   <a href="https://gemini.google.com/updates?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024enIN_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gad_source=1&gclid=Cj0KCQjwna6_BhCbARIsALId2Z39OvbJBAcSMIwuFCL6tCeX3r9L0Fgc3HjI5VoRZJ3J_5frrAO-cogaAtlWEALw_wcB&gclsrc=aw.ds" target="_blank" rel="noopener noreferrer">Update</a>
//                 </li>
//                 <li>
//                   <a href="https://gemini.google.com/faq?is_sa=1&is_sa=1&android-min-version=301356232&ios-min-version=322.0&campaign_id=bkws&utm_source=sem&utm_source=google&utm_medium=paid-media&utm_medium=cpc&utm_campaign=bkws&utm_campaign=2024enIN_gemfeb&pt=9008&mt=8&ct=p-growth-sem-bkws&gad_source=1&gclid=Cj0KCQjwna6_BhCbARIsALId2Z39OvbJBAcSMIwuFCL6tCeX3r9L0Fgc3HjI5VoRZJ3J_5frrAO-cogaAtlWEALw_wcB&gclsrc=aw.ds" target="_blank" rel="noopener noreferrer">FAQ</a>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li><span><FiLogOut style={{ marginRight: '20px' }} onClick={handleLogout} /></span> Logout</li>

//         </ul>
//       </aside>

//       <div className="chat-section">
//         <header className="chat-header">
//             <h2>Gemini AI</h2>
//             <FiUser className="login-icon"  onClick={()=>navigate("/")} />
//         </header>
            
//         <div className="chat-box">
//           {renderResponses()}
//         </div>

//         <div className="welcome-part">
//           <h1>Welcome to Gemini AI</h1>
//           <p>How can I assist Today?</p>
//         </div>

//         <div className="input-box">
//           <div className="icon-container">
//             <FiMic className="mic-icon" />
//             <label htmlFor="fileInput" >
//               <FiPlus  style={{margin:'5px'}}/>
//             </label>
//           </div>
//           <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()}placeholder="Type a message..." />
//           <button  onClick={handleSend}>
//             <FiSend />
//           </button>         

//           <input type="file" id="fileInput" style={{ display: 'none' }} /> 
//         </div>
//       </div>
    
//     </div>
//    </>
//   )
  
   
//  }
    
// export default UiPage;





// import React, { useState } from "react";
// import { FiSend, FiMic, FiMenu, FiUser, FiActivity, FiSettings, FiLogOut, FiHelpCircle, FiPlus } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMoon } from "@fortawesome/free-regular-svg-icons";
// import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
// import "./Uipage.css";

// function UiPage() {
//     const [collapsed, setCollapsed] = useState(false);
//     const [message, setMessage] = useState("");
//     const [responses, setResponses] = useState([]);
//     const [darkMode, setDarkMode] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const navigate = useNavigate();
//     // const [showHelpOptions, setShowHelpOptions] = useState(false);

//     const toggleSidebar = () => setCollapsed(!collapsed);

//     const handleSend = () => {
//         if (!message.trim()) return;

//         fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 contents: [{ parts: [{ text: message }] }]
//             }),
//         })
//         .then(res => res.json())
//         .then(data => {
//             const dataResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from API";
//             let typingText = "";
//             let i = 0;

//             setResponses(prevResponses => [...prevResponses, { message, response: "" }]);

//             const interval = setInterval(() => {
//                 if (i < dataResponse.length) {
//                     typingText += dataResponse[i];
//                     setResponses(befResponses => {
//                         const updtResponses = [...befResponses];
//                         updtResponses[updtResponses.length - 1] = { message, response: typingText };
//                         return updtResponses;
//                     });
//                     i++;
//                 } else {
//                     clearInterval(interval);
//                 }
//             }, 200);

//             setMessage("");
//         })
//         .catch(error => console.error("Error:", error));
//     };

//     const renderResponses = () => {
//         return responses.map((chat, index) => (
//             <div key={index} className="chat-item">
//                 <div className="chat-you">
//                     <p className="you"><strong>You:</strong> {chat.message}</p>
//                 </div>
//                 <div className="chat-bot">
//                     <p className="bot"><strong>Bot:</strong> {chat.response}</p>
//                 </div>
//             </div>
//         ));
//     };

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("email");
//         alert("You have logged out successfully.");
//         navigate("/login");
//     };

//     return (
//         <div className={`chat-container ${darkMode ? "dark" : "light"}`}>
//             <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//                 <button className="menu-btn" onClick={toggleSidebar}><FiMenu /></button>
//                 <ul>
//                     <li><span><FiActivity style={{ marginRight: '20px' }} /></span> Activity</li>
//                     <li onClick={handleLogout}><span><FiLogOut style={{ marginRight: '20px' }} /></span> Logout</li>
//                     <li onClick={() => setShowPopup(true)}><span><FiSettings style={{ marginRight: '20px' }} /></span> Settings</li>
//                     <li><span><FiHelpCircle style={{ marginRight: '20px' }} /></span> Help</li>
//                 </ul>
//             </aside>

//             <div className="chat-section">
//                 <header className="chat-header">
//                     <h2>Gemini AI</h2>
//                     <FiUser className="login-icon" onClick={() => navigate("/")} />
//                 </header>
//                 <div className="chat-box">{renderResponses()}</div>
//                 <div className="welcome-part">
//                     <h1>Welcome to Gemini AI</h1>
//                     <p>How can I assist Today?</p>
//                 </div>
//                 <div className="input-box">
//                     <div className="icon-container">
//                         <FiMic className="mic-icon" />
//                         <label htmlFor="fileInput"><FiPlus style={{ margin: '5px' }} /></label>
//                     </div>
//                     {showPopup && (
//                         <div className="setting-popup">
//                             <div className="popup-content">
//                                 <button onClick={() => setDarkMode(!darkMode)}>
//                                     <FontAwesomeIcon icon={faMoon} />
//                                     {darkMode ? " Light Mode" : " Dark Mode"}
//                                     <FontAwesomeIcon icon={darkMode ? faToggleOn : faToggleOff} className="toggle-icon" />
//                                 </button>
//                                 <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
//                             </div>
//                         </div>
//                     )}
//                     <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Type a message..." />
//                     <button onClick={handleSend}><FiSend /></button>
//                     <input type="file" id="fileInput" style={{ display: 'none' }} />
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default UiPage;









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