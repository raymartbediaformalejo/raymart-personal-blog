import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import classes from "../../styles/pages/sign/Login.module.css";
import { TLogin } from "../../types/types";
import { loginSchema } from "../../types/schema/Login.schema";
import LoginControllerInput from "../../components/input/LoginControllerInput";

const Login = () => {
  const { handleSubmit, control, watch, formState } = useForm<TLogin>({
    shouldFocusError: false,
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const [canFocus, setCanFocus] = useState(false);

  const onSubmit = () => {};
  const onErrors = () => {
    setCanFocus(true);
  };
  return (
    <section className={classes["login-wrapper"]}>
      <header>
        <h1>Login</h1>
      </header>
      <div className={classes["login"]}>
        <form
          className={classes["form"]}
          onSubmit={handleSubmit(onSubmit, onErrors)}
        >
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
          {/* <label htmlFor={classes["username"]}>Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          /> */}
          {/* 
          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          /> */}
          <button className="form__submit-button">Sign In</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
