import classes from "../styles/component/Footer.module.css";
import Button from "./ui/Button";
import LinkenIcon from "./icons/social/LinkenIcon";
import Tooltip from "./ui/Tooltip";
import GithubIcon from "./icons/social/GithubIcon";
import FacebookIcon from "./icons/social/FacebookIcon";

const Footer = () => {
  return (
    <footer className={classes["footer-wrapper"]}>
      <div className={classes["footer"]}>
        <p>Keep in touch:</p>
        <div>
          <Tooltip text="Linkedin">
            <Button
              className={classes["social-icon"]}
              variant="transparent"
              size="large"
            >
              <LinkenIcon />
            </Button>
          </Tooltip>
          <Tooltip text="Github">
            <Button
              className={classes["social-icon"]}
              variant="transparent"
              size="large"
            >
              <GithubIcon />
            </Button>
          </Tooltip>
          <Tooltip text="Facebook">
            <Button
              className={classes["social-icon"]}
              variant="transparent"
              size="large"
            >
              <FacebookIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
