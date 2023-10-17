import { useState } from "react";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import JobAdd from "./Pages/JobAdd/JobAdd";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Jobdescription from "./Pages/JobDescriptionPage/Jobdescription";

function App() {
 

  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register/>} />
          <Route path="/Jobadd" element={<JobAdd/>}/>
          <Route path="/Jobdescription" element={<Jobdescription/>}/>
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
