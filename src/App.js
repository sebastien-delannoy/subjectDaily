import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React from "react";

import "./App.css";
import "bulma/css/bulma.css";

import Home from "./page/Home";

import Study from "./page/Study/Study";
import StudyRead from "./page/Study/StudyRead";

import AddStudy from "./page/Study/AddStudy";
import EditStudyDetail from "./page/Study/EditStudyDetail";

import StudySiteList from "./page/StudySite/StudySiteList";
import StudySiteRead from "./page/StudySite/StudySiteRead";

import AddStudySite from "./page/StudySite/AddStudySite";
import EditStudySite from "./page/StudySite/EditStudySite";

import SubjectList from "./page/Subject/SubjectList";
import AddSubject from "./page/Subject/AddSubject";
import EditSubject from "./page/Subject/EditSubject";
import Subject from "./page/Subject/Subject";

import SubjectEvent from "./page/SubjectEvent/SubjectEvent";
import SubjectEventRead from "./page/SubjectEvent/SubjectEventRead";
import AddEvent from "./page/SubjectEvent/AddEvent";
import EditEvent from "./page/SubjectEvent/EditEvent";

import Login from "./components/Login";
import Register from "./components/Register";
import Connected from "./components/Connected";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  let userRole = sessionStorage.getItem("role");
  console.log(userRole);

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/">Purpose</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </nav>

        <div className="Fragment">
          <h1>
            <Connected />
          </h1>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dash" element={[<Dashboard />, <Navbar />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              userRole === "Global Study Manager" ? (
                <Study />
              ) : (
                <Navigate replace to={"/dashbrd"} />
              )
            }
          />

          <Route
            path="/dashbrd"
            element={
              userRole === "Primary Investigator" ? (
                <StudyRead />
              ) : (
                <Navigate replace to={"/dashboard"} />
              )
            }
          />

          <Route path="/dashbrd" element={<StudyRead />} />
          <Route path="/dashboard/add" element={<AddStudy />} />
          <Route path="/dashboard/edit/:id" element={<EditStudyDetail />} />
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
            path="/dashboard/study-site/:studyId/subject/:siteId/view/:id"
            element={<SubjectEventRead />}
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
