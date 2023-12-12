import classes from "../../styles/component/ui/Chip.module.css";

type ChipProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
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
  const newtext = text === "JavaScript" ? "JS" : text;

  const chipClass = `${classes["chip"]} ${className ? className : ""} ${
    classes[variant]
  } ${classes[newtext.toLowerCase()]} ${color ? classes[color] : ""} ${
    classes[size]
  }`;

  return <div className={chipClass}>{newtext}</div>;
};

export default Chip;
