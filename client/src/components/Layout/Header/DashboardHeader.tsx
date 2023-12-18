import { useState } from "react";

import classes from "../../../styles/component/Header.module.css";
import HamburgerIcon from "../../icons/HamburgerIcon";
import Button from "../../ui/Button";
import Tooltip from "../../ui/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import DashboardNavigationModal from "../../ui/Modals/DashboardNavigationModal";
import { DASHBOARD_MAIN_NAVIGATION_ITEMS } from "../../../utils/Constant";
import LinkButton from "../../ui/LinkButton";
import { useSendLogoutMutation } from "../../../redux/auth/auth.api";
import ToggleTheme from "../../ToggleTheme";

const DashboardHeader = () => {
  const [isOpenNavModal, setIsOpenNavModal] = useState(false);
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleToggleNav = () => {
    setIsOpenNavModal((prev) => !prev);
  };
  const handleLogout = async () => {
    try {
      await sendLogout({});
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <DashboardNavigationModal
        isOpen={isOpenNavModal}
        onClose={handleToggleNav}
      />
      <header className={`${classes["header"]} ${classes["dashboard"]}`}>
        <nav className={classes["nav"]}>
          <Link to="/dashboard">
            <Tooltip text="Dashboard Raymart Blog">
              <Button variant="icon">
                <p className={classes["logo"]}>RB</p>
              </Button>
            </Tooltip>
          </Link>
          <div className={classes["nav__left-icons-wrapper"]}>
            <div className={classes["big-screen-nav-links"]}>
              {Object.entries(DASHBOARD_MAIN_NAVIGATION_ITEMS).map(
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
            <Button
              className={classes["logout-button"]}
              variant="outlined"
              size="small"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default DashboardHeader;
