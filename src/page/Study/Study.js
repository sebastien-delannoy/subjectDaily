import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Study = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [studies, setStudy] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getStudies();
    
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

  const getStudies = async () => {
    const response = await axiosJWT.get("http://localhost:4025/studies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setStudy(response.data);
  };

  const deleteStudy = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:4025/studies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getStudies();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Fragment">
      <div className="column is-full">
        <br></br>
        <Link to={`add`} className="button is-success">
          Initiate clinical study
        </Link>
        <br></br>
        <br></br>
        <table className="table  is-fullwidth is-hoverable is-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Therapeutic Area</th>
              <th>Study Code</th>
              <th>Description</th>
              <th>Study Name</th>
              <th>Study Start</th>
              <th>Status</th>
              <th>Enrollment Objective</th>
              <th>Enrollment Rate (Monthly)</th>
              <th>Actual Enrollment</th>
              <th>Risk Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studies.map((study, index) => (
              <tr key={study.id}>
                <td>{study.id}</td>
                <td>{study.therapeutic_area}</td>
                <td>
                  <a href={`dashboard/edit/${study.id}`}>{study.study_code}</a>
                </td>
                <td>{study.short_desc}</td>
                <td>{study.study_name}</td>
                <td>{study.start_date}</td>
                <td>{study.status}</td>
                <td>{study.plansubject}</td>
                <td>{study.enrol_rate}</td>
                <td>{study.actualsubject}</td>
                <td>{study.risk_score}</td>
                <td>
                  <Link
                    hidden="until-found"
                    to={`study-site/${study.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Study Sites
                  </Link>
                  <button
                    onClick={() => deleteStudy(study.id)}
                    className="button is-small is-danger"
                  >
                    Archive Study
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Study;
