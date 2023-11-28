import React from "react";
import classes from "../../styles/component/ui/Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "medium" | "large";
};

const Button = ({ size = "medium", className, children }: ButtonProps) => {
  const buttonClass = className
    ? `${classes["button"]} ${classes[size]} ${className}`
    : `${classes["button"]}  ${classes[size]}`;

  return <button className={buttonClass}>{children}</button>;
};

export default Button;
