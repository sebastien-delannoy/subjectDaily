import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  const params = useParams();
  let { studyId, siteId, id } = useParams();
  console.log(studyId + " " + siteId + " " + id);

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [site_id, setSiteId] = useState(siteId);
  const [study_id, setStudyId] = useState(studyId);
  const [subject_id, setSubject] = useState(id);
  const [event_category, setCat] = useState("");
  const [event_desc, setDesc] = useState("");
  const [event_res, setRes] = useState("");
  const [event_critic, setCritic] = useState("");
  const [event_closed, setClosed] = useState("");

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

  const saveEvent = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.post("http://localhost:4025/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        study_id,
        site_id,
        subject_id,
        event_category,
        event_desc,
        event_res,
        event_critic,
        event_closed,
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
          <strong>Create Event</strong>
        </p>
        <br></br>

        <form onSubmit={saveEvent}>
          <fieldset disabled>
            <div className="field">
              <label className="label">Study Id</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={studyId}
                  onChange={(e) => setStudyId(e.target.value)}
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

          <fieldset disabled>
          <div className="field">
            <label className="label">Subject Id</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={id}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
              />
            </div>
          </div>
          </fieldset>

          <div className="field">
            <label className="label">Category</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={event_category}
                  onChange={(e) => setCat(e.target.value)}
                >
                  <option value="Protocol Deviation">Protocol Deviation</option>
                  <option value="Serious Adverse Event">Serious Adverse Event</option>
                  <option value="Issue">Issue</option>
                  <option value="Other">Other</option>
                  
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={event_desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Resolution</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={event_res}
                onChange={(e) => setRes(e.target.value)}
                placeholder="Description"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Criticality</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={event_critic}
                  onChange={(e) => setCritic(e.target.value)}
                >
                  <option value="Severe">Severe</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  
                </select>
              </div>
            </div>
          </div>

         

          <div className="field">
            <label className="label">Closed</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={event_closed}
                  onChange={(e) => setClosed(e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <button type="submit" className="button is-success">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
