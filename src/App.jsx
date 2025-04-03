import React from "react";
import UiPage from "./Components/UiPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/LogIn";
import SignUp from "./Components/SignUp";
// import Audio from "./Components/audio";


function App() {
  return (
    <>
   
    <Router>
    <UiPage/>
    {/* <Audio/> */}
      <Routes>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </>
  );
}
export default App;






// import React from "react";
// import UiPage from "./Components/UiPage";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./Components/LogIn";
// import SignUp from "./Components/SignUp";
// // import Audio from "./Components/AudioPage";  // ✅ Fixed Import
// // import Audio from "./Components/audio";

// function App() {
//   return (
//     <Router>
//       <UiPage />
//       {/* <AudioPage /> */}
//       <Routes>
//         {/* <Route path="/" element={<Audio  />} />   */}
//         <Route path="/signUp" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


