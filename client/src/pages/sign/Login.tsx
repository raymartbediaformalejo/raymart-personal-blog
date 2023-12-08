import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import classes from "../../styles/pages/sign/Login.module.css";
import { TLogin } from "../../types/types";
import { loginSchema } from "../../types/schema/Login.schema";
import LoginControllerInput from "../../components/input/LoginControllerInput";
import { useAppDispatch } from "../../redux/hooks/useAppDispatch";
import { useLoginMutation } from "../../redux/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../redux/auth/auth.slice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const Login = () => {
  const dispatch = useAppDispatch();
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
          <LoginControllerInput
            name="username"
            placeholder="Username"
            type="text"
            control={control}
            errorMessage={formState.errors.username?.message}
          />
          <LoginControllerInput
            name="password"
            placeholder="Password"
            type="text"
            control={control}
            errorMessage={formState.errors.password?.message}
          />
          <button className="form__submit-button">
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
