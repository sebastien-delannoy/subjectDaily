import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const SubjectList = () => {
  const [subjects, setSubject] = useState([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  let { studyId, siteId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getSubjectBySite();
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

  const getSubjectBySite = async () => {
    const response = await axiosJWT.get(
      `http://localhost:4025/subject-list/${siteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSubject(response.data);
  };

  return (
    <div className="section">
      <div className="column is-full">
        <br></br>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Site #</th>
              <th>Study #</th>
              <th>Subject Number</th>
              <th>Status</th>
              <th>Last Visit</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr key={subject.id}>
                <td>{subject.site_id}</td>
                <td>{subject.study_id}</td>
                <td>{subject.subject_number}</td>
                <td>{subject.subject_status}</td>
                <td>{subject.current_visit}</td>
                <td>
                  <Link to={`create`} className="button is-small is-info mr-2">
                    Subject Events
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;
