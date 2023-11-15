import { useState } from "react";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import JobAdd from "./Pages/JobAdd/JobAdd";
import { Provider } from "./context/JobContext.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Jobdescription from "./Pages/JobDescriptionPage/Jobdescription";
import Jobedit from "./Pages/JobEdit/Jobedit";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Jobadd" element={<JobAdd />} />
          <Route path="/Jobdescription" element={<Jobdescription />} />
          <Route path="/Jobedit" element={<Jobedit />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
