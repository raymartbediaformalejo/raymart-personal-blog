import React from "react";
import classes from "../../styles/component/ui/Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outlined" | "contained" | "icon" | "transparent";
  size?: "x-small" | "small" | "medium" | "large";
  text?: string;
  color?: "primary" | "gray";
  icon?: React.ReactNode;
};

const Button = ({
  variant = "transparent",
  size = "medium",
  color,
  text,
  icon,
  className,
  children,
}: ButtonProps) => {
  // console.log(isIconWithText);

  let content;
  const buttonClass = `${classes["button"]} ${className ? className : ""}  ${
    classes[variant]
  } ${classes[size]} ${color ? classes[color] : ""} `;

  if (text)
    content = (
      <button className={buttonClass}>
        {text} {icon}
      </button>
    );

  if (!text) content = <button className={buttonClass}>{children}</button>;

  return <>{content}</>;
};

export default Button;
