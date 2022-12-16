import React from "react";
import { useNavigate } from "react-router-dom";

const Connected = () => {
  let name = sessionStorage.getItem("user");
  let role = sessionStorage.getItem("role");

  var message;
  name === "" || name === null
    ? (message = "")
    : (message = name + ", you are connected as " + role);

    console.log (" im here");
    const navigate = useNavigate();
    navigate(0);

  return (
    <div className="Breadcrumb">
      <h1>{message}</h1>
    </div>
  );
};

export default Connected;
