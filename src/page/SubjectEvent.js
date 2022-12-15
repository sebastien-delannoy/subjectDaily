import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Subject from "./Subject";

const SubjectEvent = () => {
  const [events, setEvent] = useState([]);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [studies, setStudy] = useState([]);
  const navigate = useNavigate();

  let { studyId, siteId, id } = useParams();

  useEffect(() => {
    refreshToken();
    getEventBySubject();
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

  const getEventBySubject = async () => {
    const response = await axiosJWT.get(
      `http://localhost:4025/event-list/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setEvent(response.data);
  };

  const deleteEvent = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:4025/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getEventBySubject();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Fragment">
      
      <div className="column is-full">
        <Link to={`create`} className="button is-success">
          New Event
        </Link>
        <br></br>
        <table className="table is-striped is-fullwidth is-hoverable">
          <thead>
            <tr>
              <th>Study</th>
              <th>Site</th>
              <th>Subject</th>
              <th>Event</th>
              <th>Category</th>
              <th>Issue Description</th>
              <th>Resolution</th>
              <th>Criticality</th>
              <th>Closed</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={event.id}>
                <td>{event.study_id}</td>
                <td>{event.site_id}</td>
                <td>{event.subject_id}</td>
                <td>
                  <a href={`edit/${event.id}`}>{event.id}</a>
                </td>
                <td>{event.event_category}</td>
                <td>{event.event_desc}</td>
                <td>{event.event_res}</td>
                <td>{event.event_critic}</td>
                <td>{event.event_closed}</td>
                <td>
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="button is-small is-danger"
                  >
                    Delete
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

export default SubjectEvent;
