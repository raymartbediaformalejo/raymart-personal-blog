import classes from "../styles/component/Header.module.css";
import Button from "./ui/Button";
import Tooltip from "./ui/Tooltip";

const Header = () => {
  return (
    <header className={classes["header"]}>
      <nav className={classes["nav"]}>
        <Tooltip text="AAAaaaaaaaaaaaaaaaaa">
          <Button>Aaaaaaaaa</Button>
        </Tooltip>
        <Tooltip text="BBBaaaaaaaaaaaaaaaa">
          <Button>B</Button>
        </Tooltip>
        <Tooltip text="CCCccccccccddddddc">
          <Button>Ccccccc</Button>
        </Tooltip>
      </nav>
    </header>
  );
};

export default Header;
