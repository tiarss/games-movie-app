import React from "react";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { LoginContext } from "./context/LoginContext";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const [loginData, setLoginData] = useContext(LoginContext)
  return (
    <Route
      {...rest}
      render={props => {
        if (loginData.login == true) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
