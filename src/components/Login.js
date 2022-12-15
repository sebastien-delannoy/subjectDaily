import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import  Connected  from "../components/Connected"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("http://localhost:4025/login", {
        email: email,
        password: password,
        role: role,
        name: name,
      });

      if (response.data.role === "Global Study Manager") {
        sessionStorage.setItem("user", response.data.name);
        sessionStorage.setItem("role", response.data.role);
        navigate("/dashboard");
      } else if (response.data.role === "Primary Investigator") {
        sessionStorage.setItem("user", response.data.name);
        sessionStorage.setItem("role", response.data.role);
        navigate("/dashbrd");
      } else {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Auth} className="box">
                <p className="has-text-centered">{msg}</p>

                <div className="field mt-5">
                  <label className="label">Email</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <label className="label">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field mt-5">
                  <button className="button is-success is-fullwidth">
                    Login
                  </button>
                </div>
                <Link to={`/register`} className="button is-text">
                  Register
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Login;
