import NotFoundIllustration from "../assets/404 Error-pana.svg";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import classes from "../styles/pages/PageNotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={classes["not-found-wrapper"]}>
      <img
        className={classes["not-found__illustration"]}
        src={NotFoundIllustration}
      />
      <div className={classes["not-found__body"]}>
        <h1 className={classes["not-found__title"]}>Page not found</h1>
        <p className={classes["not-found__description"]}>
          Sorry the page you requested does not exist
        </p>
        <Button
          text="Home"
          variant="contained"
          onClick={() => navigate("/")}
          className={classes["home-button"]}
        />
      </div>
    </div>
  );
};

export default NotFound;
