import classes from "../../styles/component/ui/Chip.module.css";
import { Link, LinkProps } from "react-router-dom";

type ChipProps = LinkProps & {
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
  to,
}: ChipProps) => {
  const newtext = text === "JavaScript" ? "JS" : text;

  const chipClass = `${classes["chip"]} ${className ? className : ""} ${
    classes[variant]
  } ${classes[newtext.toLowerCase()]} ${color ? classes[color] : ""} ${
    classes[size]
  }`;

  return (
    <Link to={to} className={chipClass}>
      {newtext}
    </Link>
  );
};

export default Chip;
