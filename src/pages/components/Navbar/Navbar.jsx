import { useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { CHECK_USER_LOGIN, GET_USER_LOGIN_INFO } from "../../../queries/queries";

import "./navbar.css";

export function NavBar() {
  const navigate = useNavigate();
  const { data } = useQuery(GET_USER_LOGIN_INFO);
  function logout() {
    localStorage.clear("user");
    navigate("/register");
  }
  return (
    <nav className="nav">
      <div className="nav__brand">
        <h3 className="brand__name">Crux Share</h3>
      </div>
      <ul className="nav-info">
        <Link to="/" className="nav-item">
          Blogs
        </Link>
        <Link to="/bookmarks" className="nav-item">
          Bookmarks
        </Link>
      </ul>
      <div className="nav__right">
        <div className="create__post">
          <button
            onClick={() => navigate("/create-post")}
            className="create__post-button"
          >
            Create Post
          </button>
        </div>
        {data.userInfo.isUserLogin === true && (
          <button className="logout__button" onClick={() => logout()}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
