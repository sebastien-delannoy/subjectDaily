import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const EditSubject = () => {
  const [site_id, setSiteId] = useState("");
  const [study_id, setStudyId] = useState("");
  const [subject_number, setSubject] = useState("");
  const [current_visit, setVisit] = useState("");
  const [subject_status, setSubjectStatus] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const navigate = useNavigate();
  const { studyId, siteId, id } = useParams();

  useEffect(() => {
    refreshToken();
    getSubjectById();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:4025/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);

      console.log(response.data.accessToken);
    } catch (error) {
      if (error.response) {
        navigate("/login");
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
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  const updateSubject = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.patch(`http://localhost:4025/updatesubject/${id}`, {
        site_id,
        study_id,
        subject_number,
        current_visit,
        subject_status,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubjectById = async () => {
    const response = await axiosJWT.get(`http://localhost:4025/getsubject/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    setSiteId(response.data.site_id);
    setStudyId(response.data.study_id);
    setSubject(response.data.subject_number);
    setSubjectStatus(response.data.subject_status);
    setVisit(response.data.current_visit);
   
  };

  return (
    <div className="section">
      <div className="column is-full">
        <form onSubmit={updateSubject}>


         <fieldset disabled>
          <div className="field">
            <label className="label">Study Id</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={study_id}
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
                value={site_id}
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
              Update Subject Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubject;
