import React from "react";

import classes from "../../styles/component/ui/Chip.module.css";

type ChipProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "transparent" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?: "primary" | "gray";
  text: string;
};

const Chip = ({
  variant = "transparent",
  size = "medium",
  color,
  text,
  className,
}: ChipProps) => {
  const chipClass = `${classes["chip"]} ${className ? className : ""} ${
    classes[variant]
  } ${classes[text.toLowerCase()]} ${color ? classes[color] : ""} ${
    classes[size]
  }`;

  return <a className={chipClass}>{text}</a>;
};

export default Chip;
