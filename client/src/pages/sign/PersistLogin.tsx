import { useEffect, useRef, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { useRefreshMutation } from "../../redux/auth/auth.api";
import usePersist from "../../hooks/usePersist";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useAppSelector((state) => state.auth.token);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  // @ts-expect-error: Unreachable code error
  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          // const response =
          // @ts-expect-error: Unreachable code error

          await refresh();
          // const { accessToken } = response.data
          setTrueSuccess(true);
          console.log("verified refresh token");
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
    // persist: no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    console.log("loading");
    content = <p>Loading...</p>;
  } else if (isError) {
    //persist: yes, token: no
    console.log("error");
    content = (
      <p className="errmsg">
        {/* @ts-expect-error: Unreachable code error */}
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
