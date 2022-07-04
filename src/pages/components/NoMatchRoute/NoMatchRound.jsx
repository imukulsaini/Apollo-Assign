import { useNavigate } from "react-router";
import "./nomatchroute.css";

export default function NoMatch() {
  const navigate = useNavigate();
  return (
    <div className="no-match">
      <div className="no-match__main">
        <h2 className="no-match__text">
          "Unfortunately the page you are looking for has been moved or
          deleted."
        </h2>
        <button onClick={() => navigate("/")} className="redirect-btn">
          Go to HomePage
        </button>
      </div>
    </div>
  );
}
