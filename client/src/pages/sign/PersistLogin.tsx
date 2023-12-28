import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { useRefreshMutation } from "../../redux/auth/auth.api";
import usePersist from "../../hooks/usePersist";
import { CircularProgress } from "@mui/material";
import ErrorUnauthorized from "../../assets/401 Error Unauthorized-cuate2.svg";
import { Button } from "@mui/material";

import classes from "../../styles/pages/sign/PersistLogin.module.css";

const PersistLogin = () => {
  const [persist] = usePersist();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  const handleLoginAgain = () => {
    navigate("/login");
  };

  // @ts-expect-error: Unreachable code error
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        try {
          // const response =
          // @ts-expect-error: Unreachable code error

          await refresh();
          // const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = (
      <div className="loading-wrapper">
        <CircularProgress size="3rem" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className={classes["unauthorized-wrapper"]}>
        <div className={classes["unauthorized-inner-wrapper"]}>
          <div className={classes["error-message-wrapper"]}>
            <p className={classes["error-subtitle"]}>Error</p>
            <h1 className={classes["error-title"]}>
              <span>4</span> <span>1</span>
            </h1>
            <p className={classes["error-description"]}>
              <span>
                {/* @ts-expect-error: Unreachable code error */}

                {`${error?.data?.message}`}
              </span>
            </p>
          </div>
          <img src={ErrorUnauthorized} />
          <div className={classes["buttons-wrapper"]}>
            <Button onClick={() => navigate("/")} variant="outlined">
              Home
            </Button>
            <Button onClick={handleLoginAgain} variant="contained">
              Please login again
            </Button>
          </div>
        </div>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
