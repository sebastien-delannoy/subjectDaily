import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const EditStudySite= () => {
 
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [study_id, setStudyId] = useState("");
  const [country, setCountry] = useState("");
  const [site_reference, setSiteRef] = useState("");
  const [centre, setCentre] = useState("");
  const [principalinvest, setInvest] = useState("");
  const [actualenroll, setActual] = useState("");
  const [status, setStatus] = useState("");
  const [plamenroll, setPlan] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getStudySiteById();
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

  const updateStudySite = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.patch(`http://localhost:4025/updatesite/${id}`, {
        study_id,
        country,
        site_reference,
        centre,
        principalinvest,
        status,
        actualenroll,
        plamenroll,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } );
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudySiteById = async () => {
    const response = await axiosJWT.get(`http://localhost:4025/getstudysite/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setStudyId(response.data.study_id);
    setCountry(response.data.country);
    setSiteRef(response.data.site_reference);
    setCentre(response.data.centre);
    setInvest(response.data.principalinvest);
    setStatus(response.data.status);
    setPlan(response.data.plamenroll);
    setActual(response.data.actualenroll);
  };

  return (
    <div className="Fragment">
      <div className="column is-full">
      <p><strong>Update Clinical Site Information</strong></p>
      <br></br>
        <form onSubmit={updateStudySite}>

        <fieldset disabled> 
        <div className="field">
            <label className="label">Study Id</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={study_id}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudySite;
