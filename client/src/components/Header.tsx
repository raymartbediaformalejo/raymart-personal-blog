import { useState } from "react";

import classes from "../styles/component/Header.module.css";
import HamburgerIcon from "./icons/HamburgerIcon";
import SunIcon from "./icons/SunIcon";
import Button from "./ui/Button";
import Tooltip from "./ui/Tooltip";
import MainNavigationModal from "./ui/Modals/MainNavigationModal";

const Header = () => {
  const [isOpenNavModal, setIsOpenNavModal] = useState(false);

  const handleToggleNav = () => {
    setIsOpenNavModal((prev) => !prev);
  };

  return (
    <>
      <MainNavigationModal isOpen={isOpenNavModal} onClose={handleToggleNav} />
      <header className={classes["header"]}>
        <nav className={classes["nav"]}>
          <Tooltip text="Raymart Formalejo Blog">
            <Button variant="icon">
              <p className={classes["logo"]}>RB</p>
            </Button>
          </Tooltip>
          <div className={classes["nav__left-icons-wrapper"]}>
            <Button variant="icon" onClick={handleToggleNav}>
              <HamburgerIcon />
            </Button>
            <Tooltip text="Switch to light mode">
              <Button variant="icon">
                <SunIcon />
              </Button>
            </Tooltip>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
