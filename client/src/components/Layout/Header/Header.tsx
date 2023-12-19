import { useState } from "react";

import classes from "../../../styles/component/Header.module.css";
import HamburgerIcon from "../../icons/HamburgerIcon";
import Button from "../../ui/Button";
import MainNavigationModal from "../../ui/Modals/MainNavigationModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import { MAIN_NAVIGATION_ITEMS } from "../../../utils/Constant";
import ToggleTheme from "../../ToggleTheme";
import ArrowLongIcon from "../../icons/ArrowLongIcon";
import { Tooltip } from "@mui/material";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpenNavModal, setIsOpenNavModal] = useState(false);
  let rightContent;

  if (pathname === "/") {
    rightContent = (
      <Tooltip title="Raymart Formalejo">
        <Link to={pathname}>
          <Button variant="icon">
            <p className={classes["logo"]}>RB</p>
          </Button>
        </Link>
      </Tooltip>
    );
  } else {
    rightContent = (
      <Tooltip title="Back">
        <div>
          <Button variant="icon" onClick={() => navigate(-1)}>
            <ArrowLongIcon />
          </Button>
        </div>
      </Tooltip>
    );
  }

  const handleToggleNav = () => {
    setIsOpenNavModal((prev) => !prev);
  };

  return (
    <>
      <MainNavigationModal isOpen={isOpenNavModal} onClose={handleToggleNav} />
      <header className={classes["header"]}>
        <nav className={classes["nav"]}>
          {rightContent}
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
