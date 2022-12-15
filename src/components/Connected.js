import React from "react";

function Connected ()  {
  let name = sessionStorage.getItem("user");
  let role = sessionStorage.getItem("role");

  var message;
  name === "" || name === null
    ? (message = "")
    : (message = name + ", you are connected as " + role);

  return (
    <div className="Breadcrumb">
      <h1>{message}</h1>
    </div>
  );
};

export default Connected;
