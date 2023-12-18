import { useState } from "react";

import classes from "../../../styles/component/Header.module.css";
import HamburgerIcon from "../../icons/HamburgerIcon";
import Button from "../../ui/Button";
import Tooltip from "../../ui/Tooltip";
import MainNavigationModal from "../../ui/Modals/MainNavigationModal";
import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import { MAIN_NAVIGATION_ITEMS } from "../../../utils/Constant";
import ToggleTheme from "../../ToggleTheme";

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
          <Link to="/">
            <Tooltip text="Raymart Formalejo Blog">
              <Button variant="icon">
                <p className={classes["logo"]}>RB</p>
              </Button>
            </Tooltip>
          </Link>
          <div className={classes["nav__left-icons-wrapper"]}>
            <div className={classes["big-screen-nav-links"]}>
              {Object.entries(MAIN_NAVIGATION_ITEMS).map(
                ([key, { url, name }]) => (
                  <LinkButton key={key} to={url} color="gray">
                    {name}
                  </LinkButton>
                )
              )}
            </div>
            <Button
              className={classes["hamburger-button"]}
              variant="icon"
              onClick={handleToggleNav}
            >
              <HamburgerIcon />
            </Button>
            <ToggleTheme />
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
