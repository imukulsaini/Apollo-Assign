import { useQuery } from "@apollo/client";
import React, { lazy, Suspense, useEffect } from "react";
import {Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import NoMatch from "./pages/components/NoMatchRoute/NoMatchRound";
import { PrivateRoute } from "./pages/components/PrivateRoute/PrivateRoute";
import {
  GET_USER_DATA_BY_ID,
  GET_USER_LOGIN_INFO,
  userInfo,
} from "./queries/queries";

const Bookmark = lazy(() => import("./pages/Bookmark/Bookmark"));

const CreatePost = lazy(() => import("./pages/CreatePost/CreatePost"));
const Home = lazy(() => import("./pages/Home/Home"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));

function App() {
  const {
    data: { userLoginInfo },
  } = useQuery(GET_USER_LOGIN_INFO);

  const { data, loading } = useQuery(GET_USER_DATA_BY_ID, {
    variables: {
      userId: localStorage.getItem("userId"),
    },
    skip: localStorage.getItem("userId") === null,
    fetchPolicy: "cache-and-network",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // if refresh get user data 
    if (data && loading === false) {
      userInfo({
        userId: data?.getUserData?._id,
        username: data?.getUserData?.username,
        firstName: data?.getUserData?.firstName,
        lastName: data?.getUserData?.lastName,
        isUserLogin: true,
      });
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [userLoginInfo, data, loading]);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading.....</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-post"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <PrivateRoute>
                <Bookmark />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
