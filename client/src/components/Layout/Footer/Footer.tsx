import classes from "../../../styles/component/Footer.module.css";
import Button from "../../ui/Button";
import LinkenIcon from "../../icons/social/LinkenIcon";
import GithubIcon from "../../icons/social/GithubIcon";
import FacebookIcon from "../../icons/social/FacebookIcon";
import { Tooltip } from "@mui/material";

const Footer = () => {
  return (
    <footer className={`container ${classes["footer-wrapper"]}`}>
      <div className={classes["footer"]}>
        <p>Keep in touch:</p>
        <div>
          <Tooltip title="Linkedin">
            <div>
              <Button
                className={classes["social-icon"]}
                variant="transparent"
                size="large"
              >
                <LinkenIcon />
              </Button>
            </div>
          </Tooltip>
          <Tooltip title="Github">
            <div>
              <Button
                className={classes["social-icon"]}
                variant="transparent"
                size="large"
              >
                <GithubIcon />
              </Button>
            </div>
          </Tooltip>
          <Tooltip title="Facebook">
            <div>
              <Button
                className={classes["social-icon"]}
                variant="transparent"
                size="large"
              >
                <FacebookIcon />
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
