import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import classes from "../../styles/pages/sign/Login.module.css";
import { TLogin } from "../../types/types";
import { loginSchema } from "../../types/schema/Login.schema";
import LoginInputController from "../../components/input/LoginInputController";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useLoginMutation } from "../../redux/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/auth/auth.slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import usePersist from "../../hooks/usePersist";
import Button from "../../components/ui/Button";

const Login = () => {
  const dispatch = useAppDispatch();
  const [persist, setPersist] = usePersist();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const { handleSubmit, control, watch, reset, formState } = useForm<TLogin>({
    shouldFocusError: false,
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  console.log("watch: ", watch(["username", "password"]));

  const handleToggle = () => setPersist((prev) => !prev);

  // const [canFocus, setCanFocus] = useState(false);

  const onSubmit = async (data: TLogin) => {
    const { username, password } = data;
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      reset();
      navigate("/");
    } catch (err) {
      // @ts-expect-error: Unreachable code error
      if (!("status" in err)) {
        setErrMsg("No Server Response");
      } else if ((err as FetchBaseQueryError).status === 400) {
        setErrMsg("Missing Username or Password");
      } else if ((err as FetchBaseQueryError).status === 401) {
        setErrMsg("Unauthorized");
      } else {
        // @ts-expect-error: Unreachable code error
        // prettier-ignore
        setErrMsg((err as FetchBaseQueryError).data?.message)
      }
    }
  };
  // const onErrors = () => {
  //   setCanFocus(true);
  // };
  return (
    <section className={classes["login-wrapper"]}>
      <header>
        <h1>Login</h1>
      </header>
      <div className={classes["login"]}>
        <p aria-live="assertive">{errMsg}</p>
        <form className={classes["form"]} onSubmit={handleSubmit(onSubmit)}>
          <LoginInputController
            name="username"
            placeholder="Username"
            type="text"
            control={control}
            errorMessage={formState.errors.username?.message}
            autoComplete="off"
          />
          <LoginInputController
            name="password"
            placeholder="Password"
            type="password"
            control={control}
            errorMessage={formState.errors.password?.message}
          />
          <label htmlFor="persist" className={classes["form__persist"]}>
            <input
              type="checkbox"
              className={classes["form__checkbox"]}
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust this device
          </label>
          <Button type="submit" className={classes["form__submit-button"]}>
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
