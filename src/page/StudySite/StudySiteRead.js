import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const StudySiteList = () => {
  const [studysites, setStudySite] = useState([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  let { StudyCode, studyId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getStudySiteByStudy();
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

  return (
    <div className="Fragment">
      <div className="column is-full">
        <p>
          <strong>Study Site for {studyId}</strong>
        </p>
        <br></br>

        <table className="table is-fullwidth is-hoverable is-bordered">
          <thead>
            <tr>
              <th>Country</th>
              <th>Site Reference</th>
              <th>Centre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {studysites.map((studysite, index) => (
              <tr key={studysite.id}>
                <td>{studysite.country}</td>
                <td>{studysite.site_reference}</td>
                <td>{studysite.centre}</td>
                <td>
                  <Link
                    to={`subject/${studysite.id}`}
                    className="button is-small is-info mr-2"
                  >
                    Subject
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

export default StudySiteList;
