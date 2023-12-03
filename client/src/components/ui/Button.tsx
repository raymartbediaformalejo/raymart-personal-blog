import React from "react";
import classes from "../../styles/component/ui/Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outlined" | "contained" | "icon" | "transparent";
  size?: "small" | "medium" | "large";
  text?: string;
};

const Button = ({
  variant = "transparent",
  size = "medium",
  text,
  className,
  children,
}: ButtonProps) => {
  let content;
  const buttonClass =
    className && variant && size
      ? `${classes["button"]} ${classes[variant]} ${classes[size]} ${className}`
      : variant && size
      ? `${classes["button"]} ${classes[variant]} ${classes[size]}`
      : `${classes["button"]}  ${classes[size]}`;

  if (text) content = <button className={buttonClass}>{text}</button>;

  if (!text) content = <button className={buttonClass}>{children}</button>;

  return <>{content}</>;
};

export default Button;
