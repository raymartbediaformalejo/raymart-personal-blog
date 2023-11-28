import React from "react";
import classes from "../../styles/component/ui/Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outlined" | "contained" | "icon" | "transparent";
  size?: "small" | "medium" | "large";
};

const Button = ({
  variant = "transparent",
  size = "medium",
  className,
  children,
}: ButtonProps) => {
  const buttonClass =
    className && variant && size
      ? `${classes["button"]} ${classes[variant]} ${classes[size]} ${className}`
      : variant && size
      ? `${classes["button"]} ${classes[variant]} ${classes[size]}`
      : `${classes["button"]}  ${classes[size]}`;

  return <button className={buttonClass}>{children}</button>;
};

export default Button;
