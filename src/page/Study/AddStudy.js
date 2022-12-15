import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


const AddStudy = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [therapeutic_area, setTherapeutic] = useState("");
  const [study_code, setStudycode] = useState("");
  const [short_desc, setShortdesc] = useState("");
  const [study_name, setStudyname] = useState("");
  const [start_date, setStart] = useState("");
  const [status, setStatus] = useState("");
  const [plansubject, setPlan] = useState("");
  const [enrol_rate, setRate] = useState("");
  const [actualsubject, setActual] = useState("");
  const [risk_score, setScore] = useState("");

  const navigate = useNavigate();
  const params = useParams();


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


  const saveStudy = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.post("http://localhost:4025/studies", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        therapeutic_area,
        study_code,
        short_desc,
        study_name,
        start_date,
        status,
        plansubject,
        enrol_rate,
        actualsubject,
        risk_score,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Fragment">
      <div className="column is-full">
        <p><strong>Enter New Study Information</strong></p>
        <br></br>
        <form onSubmit={saveStudy}>
            
        <div className="field">
            <label className="label">Therapeutic Area</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={therapeutic_area}
                  onChange={(e) => setTherapeutic(e.target.value)}
                >
                  <option value="Cardiovascular">Cardiovascular</option>
                  <option value="Central Nervous System">Central Nervous System</option>
                  <option value="Immunology">Immunology</option>
                  <option value="Internal Medicine">Internal Medicine</option>
                  <option value="Vaccines">Vaccines</option>
                  <option value="Woman Health">Woman Health</option>
                </select>
              </div>
            </div>
          </div>

          
            <div className="field">
              <label className="label">Study Code</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={study_code}
                  onChange={(e) => setStudycode(e.target.value)}
                  placeholder="Study Code"
                  required
                />
              </div>
            </div>
          

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={short_desc}
                onChange={(e) => setShortdesc(e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Study Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={study_name}
                onChange={(e) => setStudyname(e.target.value)}
                placeholder="Study Name"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Study Start</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={start_date}
                onChange={(e) => setStart(e.target.value)}
                placeholder="Study Start"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Status</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Planned">Planned</option>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Stopped">Stopped</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Enrollment Objective</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={plansubject}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="Enrollment Objective"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Enrollment Rate (Monthly)</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={enrol_rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Enrollment Rate"
              />
            </div>
          </div>

          <fieldset disabled>
            <div className="field">
              <label className="label">Actual Enrollment</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={actualsubject}
                 onChange={(e) => setRate(e.target.value)}
                  placeholder="Enrollment Rate"
                />
              </div>
            </div>
          </fieldset>

          <fieldset disabled>
            <div className="field">
              <label className="label">Risk Score</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={risk_score}
                  onChange={(e) => setScore(e.target.value)}
                  placeholder="Risk Score"
                />
              </div>
            </div>
          </fieldset>


          <div className="field">
            <button type="submit" className="button is-success">
              Create Study
            </button>
            <button className="button is-info">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudy;
