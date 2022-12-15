import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";



import "./App.css";
import "bulma/css/bulma.css";

import Home from "./page/Home";

import Study from "./page/Study";
import StudyRead from "./page/StudyRead";

import AddStudy from "./page/AddStudy";
import EditStudy from "./page/EditStudy";

import StudySiteList from "./page/StudySiteList";
import StudySiteRead from "./page/StudySiteRead";

import AddStudySite from "./page/AddStudySite";
import EditStudySite from "./page/EditStudySite";

import SubjectList from "./page/SubjectList";
import AddSubject from "./page/AddSubject";
import EditSubject from "./page/EditSubject";
import Subject from "./page/Subject";

import SubjectEvent from "./page/SubjectEvent";
import AddEvent from "./page/AddEvent";
import EditEvent from "./page/EditEvent";

import Login from "./components/Login";
import Register from "./components/Register";
import Connected from "./components/Connected";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");


  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:4025/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setRole(decoded.role);
      setExpire(decoded.exp);

      console.log(response.data.accessToken);
    } catch (error) {
      if (error.response) {
       console.log(error)
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:4025/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setRole(decoded.role);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  sessionStorage.setItem("username", name);
  sessionStorage.setItem("role", role);

  let connectedRole=role;


  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Purpose</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </nav>

        {/* <div className="Fragment">
          <h1>
            <Connected />
          </h1>
        </div> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={[<Dashboard />, <Navbar />]} />
          <Route
            exact
            path="/dashboard"
            element={
              connectedRole === "Global Study Manager" ? (
                <Study />
              ) : (
                <Navigate replace to={"/dashbrd"} />
              )
            }
          />
          <Route path="/dashboard" element={<Study />} />
          <Route path="/dashbrd" element={<StudyRead />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/add" element={<AddStudy />} />
          <Route path="/dashboard/edit/:id" element={<EditStudy />} />
          <Route
            path="/dashboard/study-site/:studyId"
            element={<StudySiteList />}
          />
          <Route
            path="/dashbrd/study-site/:studyId"
            element={<StudySiteRead />}
          />
          <Route
            path="/dashboard/study-site/:siteId/new"
            element={<AddStudySite />}
          />
          <Route
            path="/dashboard/study-site/:id/edit/:id"
            element={<EditStudySite />}
          />
          <Route
            path="/dashboard/study-site/:studyId/subject/:siteId"
            element={<SubjectList />}
          />
          <Route
            path="/dashbrd/study-site/:studyId/subject/:siteId"
            element={<Subject />}
          />
          <Route
            path="/dashbrd/study-site/:studyId/subject/:siteId/create/"
            element={<AddSubject />}
          />
          <Route
            path="/dashbrd/study-site/:studyId/subject/:siteId/edit/:id"
            element={<EditSubject />}
          />
          <Route
            path="/dashbrd/study-site/:studyId/subject/:siteId/eventlist/:id"
            element={<SubjectEvent />}
          />

          <Route
            path="/dashbrd/study-site/:studyId/subject/:siteId/eventlist/:id/create"
            element={<AddEvent />}
          />

          <Route
            path="/dashbrd/study-site/:studyId/subject/:siteId/eventlist/edit/:id"
            element={<EditEvent />}
          />

          <Route path="/subject" element={<Subject />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
