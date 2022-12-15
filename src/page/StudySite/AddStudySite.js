import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddStudySite = () => {
  const navigate = useNavigate();
  const params = useParams();
  let { siteId } = useParams();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [study_id, setStudyId] = useState(siteId);
  const [country, setCountry] = useState("");
  const [site_reference, setSiteRef] = useState("");
  const [centre, setCentre] = useState("");
  const [principalinvest, setInvest] = useState("");
  const [plamenroll, setPlan] = useState("");
  const [actualenroll, setActual] = useState("");
  const [status, setStatus] = useState("Active");

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

  const saveStudySite = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.post("http://localhost:4025/studysites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        study_id,
        country,
        site_reference,
        centre,
        principalinvest,
        plamenroll,
        actualenroll,
        status,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <div className="Fragment">
      <div className="column is-full">
        <p>
          <strong>Enter Clinical Site Information</strong>
        </p>
        <br></br>
        <form onSubmit={saveStudySite}>
          
          <fieldset disabled>
            <div className="field">
              <label className="label">Study Id</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={siteId}
                  onChange={(e) => setStudyId(e.target.value)}
                  placeholder="Study Id"
                />
              </div>
            </div>
          </fieldset>

          <div className="field">
            <label className="label">Country</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="Belgium">Belgium</option>
                  <option value="France">France</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Spain">Spain</option>
                  <option value="Wakanda">Wakanda</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Site reference</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={site_reference}
                onChange={(e) => setSiteRef(e.target.value)}
                placeholder="Site reference"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Centre</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={centre}
                onChange={(e) => setCentre(e.target.value)}
                placeholder="Centre"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Investigator</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={principalinvest}
                onChange={(e) => setInvest(e.target.value)}
                placeholder="Investigator"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Plan</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={plamenroll}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="Plan"
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Current</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={actualenroll}
                onChange={(e) => setActual(e.target.value)}
                placeholder="Current"
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
                  <option value="Active">Active</option>
                  <option value="Stopped">Stopped</option>
                  <option value="OnHold">OnHold</option>
                </select>
              </div>
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

export default AddStudySite;
