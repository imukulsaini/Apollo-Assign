import { useQuery } from "@apollo/client";
import React from "react";
import { Navigate } from "react-router-dom";
import { GET_USER_LOGIN_INFO } from "../../../queries/queries";

export function PrivateRoute({ children }) {
  const { data } = useQuery(GET_USER_LOGIN_INFO);
  return data.userInfo.isUserLogin === true ? (
    children
  ) : (
    <Navigate
      state={{
        from: "/",
      }}
      replace
      to="/login"
    />
  );
}
