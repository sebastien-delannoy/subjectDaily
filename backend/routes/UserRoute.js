import express from "express";
// import { protect }  from "../middleware/authMiddleware.js";

import {
  getUsers,
  Register,
  Login,
  Logout,
} from "../controllers/UserController.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

import {
  getStudies,
  getStudyById,
  createStudy,
  updateStudy,
  deleteStudy,
} from "../controllers/StudyController.js";

import {
  getStudySites,
  getStudySiteById,
  getStudySiteByStudy,
  createStudySite,
  updateStudySite,
  deleteStudySite,
} from "../controllers/StudySiteController.js";

import {
  getSubjectById,
  getSubjects,
  getSubjectBySite,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/SubjectController.js";

import {
  getEventById,
  getEvents,
  getEventBySubject,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/EventController.js";



const router = express.Router();

router.get("/studies", verifyToken, getStudies);
router.get("/studies/:id", verifyToken, getStudyById);
router.post("/studies", verifyToken, createStudy);
router.patch("/studies/:id", verifyToken, updateStudy);
router.delete("/studies/:id", verifyToken, deleteStudy);

router.get("/studysite", verifyToken, getStudySites);
router.get("/getstudysite/:id", verifyToken, getStudySiteById);
router.get("/study-site/:studyId", verifyToken, getStudySiteByStudy);
router.post("/studysites", verifyToken, createStudySite);
router.patch("/updatesite/:id", verifyToken, updateStudySite);
router.delete("/studysite/:id", verifyToken, deleteStudySite);

router.get("/getsubject/:id", verifyToken, getSubjectById);
router.get("/subject-list/:siteId", verifyToken, getSubjectBySite);
router.get("/subjects-list/", verifyToken, getSubjects);
router.post("/subjects", verifyToken, createSubject);
router.patch("/updatesubject/:id", verifyToken, updateSubject);
router.delete("/subject/:id", verifyToken, deleteSubject);

router.get("/getevent/:id", verifyToken, getEventById);
router.get("/event-list/:id", verifyToken, getEventBySubject);
router.get("/events-list/", verifyToken, getEvents);
router.post("/events", verifyToken, createEvent);
router.patch("/updateevent/:id", verifyToken, updateEvent);
router.delete("/event/:id", verifyToken, deleteEvent);

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
