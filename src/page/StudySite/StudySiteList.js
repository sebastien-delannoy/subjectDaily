import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const StudySiteList = () => {
  const [studysites, setStudySite] = useState([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [study, setStudy] = useState([]);

  let { studyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getStudySiteByStudy();
    getStudyNameById();
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

  const getStudySiteByStudy = async () => {
    const response = await axiosJWT.get(
      `http://localhost:4025/study-site/${studyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setStudySite(response.data);
  };

  const getStudyNameById = async () => {
    try {
    const response = await axiosJWT.get(
      `http://localhost:4025/study/${studyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setStudy(response.data);
    
  } catch (error) {
    console.log(error);
  }
  };

  const deleteStudySite = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:4025/studysite/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getStudySiteByStudy();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Fragment">
      <div className="column is-full">
        <p>
          <strong>Study Site for clinical study {study.study_code}</strong>
        </p>
        <br></br>
        <Link to={`new`} className="button is-success">
          New Study Site
        </Link>
        <br></br> <br></br>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Country</th>
              <th>Site Reference</th>
              <th>Centre</th>
              <th>Primary Investigator</th>
              <th>Enrollment commitment</th>
              <th>Current enrollement</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {studysites.map((studysite, index) => (
              <tr key={studysite.id}>
                <td>{studysite.country}</td>
                <td>
                  <a href={`dashboard/edit/${studysite.id}`}>
                    {studysite.site_reference}
                  </a>
                </td>
                <td>{studysite.centre}</td>
                <td>{studysite.principalinvest}</td>
                <td>{studysite.plamenroll}</td>
                <td>{studysite.actualenroll}</td>
                <td>{studysite.status}</td>

                <td>
                  <Link
                    to={`subject/${studysite.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Subject
                  </Link>

                  <button
                    onClick={() => deleteStudySite(studysite.id)}
                    className="button is-small is-danger"
                  >
                    Discontinue
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

export default StudySiteList;
