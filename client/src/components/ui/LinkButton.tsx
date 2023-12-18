import { LinkProps, Link } from "react-router-dom";

import classes from "../../styles/component/ui/Link.module.css";

type CustomLinkProps = LinkProps & {
  variant?: "transparent" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  color?: "primary" | "gray";
};

const LinkButton = (props: CustomLinkProps) => {
  const linkClass = `${classes["link"]} ${
    props.className ? props.className : ""
  } ${props.variant ? classes[props.variant] : classes["transparent"]} ${
    props.color ? classes[props.color] : ""
  } ${props.size ? classes[props.size] : classes["medium"]}`;

  return (
    <Link {...props} className={linkClass}>
      {props.children}
    </Link>
  );
};

export default LinkButton;
