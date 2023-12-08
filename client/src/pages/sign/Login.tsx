import React from "react";
import classes from "../../styles/pages/sign/Login.module.css";

const Login = () => {
  const handleSubmit = () => {};
  return (
    <section className={classes["login-wrapper"]}>
      <header>
        <h1>Login</h1>
      </header>
      <div className={classes["login"]}>
        {/* <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p> */}
        <form className={classes["form"]} onSubmit={handleSubmit}>
          <label htmlFor={classes["username"]}>Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
