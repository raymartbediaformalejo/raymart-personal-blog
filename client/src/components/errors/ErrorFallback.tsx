import {
  // ErrorBoundary,
  FallbackProps,
  // useErrorBoundary,
} from "react-error-boundary";

import Button from "../ui/Button";
import SomethingWentWrongIllustration from "../../assets/400 Error Bad Request-rafiki.svg";
import classes from "../../styles/pages/ErrorFallback.module.css";

const ErrorFallback = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div className={classes["error-fallback-wrapper"]}>
      <div className={classes["error-fallback-inner-wrapper"]}>
        <div className={classes["error-fallback__header"]}>
          <h1 className={classes["error-fallback__title"]}>
            Oops! Something went wrong.
          </h1>

          <img
            className={classes["error-fallback-illustration"]}
            src={SomethingWentWrongIllustration}
          />
        </div>
        <div className={classes["error-fallback__body"]}>
          <p className={classes["error-message"]}>{error.message}</p>
          <p className={classes["try-again-text"]}>
            You may also refresh the page of try again later
          </p>
          <Button
            variant="contained"
            onClick={resetErrorBoundary}
            text="Reload"
            className={classes["error-fallback__reload-button"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
