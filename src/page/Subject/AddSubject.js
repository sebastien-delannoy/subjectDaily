import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  let { studyId, siteId } = useParams();
  console.log (studyId +  ' ' + siteId )

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [site_id, setSiteId] = useState(siteId);
  const [study_id, setStudyId] = useState(studyId);
  const [subject_number, setSubject] = useState("");
  const [subject_status, setSubjectStatus] = useState("");
  const [current_visit, setVisit] = useState("");
  const [studies, setStudy] = useState("");

  

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
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const saveSubject = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.post("http://localhost:4025/subjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        site_id,
        study_id,
        subject_number,
        current_visit,
        subject_status,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className="section">
      <div className="column is-full">
        <p>
          <strong>Create Subject</strong>
        </p>
        <br></br>

        <form onSubmit={saveSubject}>
          
        <fieldset disabled>
          <div className="field">
            <label className="label">Study Id</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={studyId}
                onChange={(e) => setStudy(e.target.value)}
                placeholder="Study"
              />
            </div>
          </div>
          </fieldset>

          <fieldset disabled>
          <div className="field">
            <label className="label">Site Id</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                placeholder="Site"
              />
            </div>
          </div>
          </fieldset>

          <div className="field">
            <label className="label">Subject</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={subject_number}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={subject_status}
                  onChange={(e) => setSubjectStatus(e.target.value)}
                >
                  <option value="Screening">Screening</option>
                  <option value="Sreen Failure">Sreen Failure</option>
                  <option value="Treatment">Treatment</option>
                  <option value="Dropped Treatment">Dropped Treatment</option>
                  <option value="Follow-Up">Follow-Up</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Last Visit</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={current_visit}
                onChange={(e) => setVisit(e.target.value)}
                placeholder="Last Visit"
              />
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Deploy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubject;
