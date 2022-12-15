import useBreadcrumbs from "use-react-router-breadcrumbs";
import React from "react";
import Connected from "./Connected";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <React.Fragment>
      {breadcrumbs.map(({ breadcrumb }) =>  breadcrumb)}
      <Connected />
    </React.Fragment>
  );
};

export default Breadcrumbs;