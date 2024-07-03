import React from "react";
import { Navigate, Route } from "react-router-dom";

import { useProfile } from "../Hooks/UserHooks";

const AuthProtected = (props) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={{ pathname: "/auth-login", state: { from: props.location } }} />;
  }

  return <>{props.children}</>;
};
// 
const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={(props) => <Component {...props} />}
    />
  );
};

export { AuthProtected, AccessRoute };
