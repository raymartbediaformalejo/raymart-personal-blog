import React from "react";
import classes from "../../styles/component/ui/Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "outlined" | "contained" | "icon" | "transparent";
  size?: "x-small" | "small" | "medium" | "large";
  text?: string;
  color?: "primary" | "gray";
  icon?: React.ReactNode;
  noHover?: boolean;
};

const Button = ({
  variant = "transparent",
  size = "medium",
  color,
  text,
  icon,
  noHover = false,
  onClick,
  className,
  children,
  type = "button",
}: ButtonProps) => {
  // console.log(isIconWithText);

  let content;
  const buttonClass = `${classes["button"]} ${className ? className : ""}  ${
    classes[variant]
  } ${classes[size]} ${color ? classes[color] : ""} ${
    noHover ? classes["no-hover"] : ""
  } `;

  if (text)
    content = (
      <button type={type} className={buttonClass} onClick={onClick}>
        {text} {icon}
      </button>
    );

  if (!text)
    content = (
      <button type={type} onClick={onClick} className={buttonClass}>
        {children}
      </button>
    );

  return <>{content}</>;
};

export default Button;
