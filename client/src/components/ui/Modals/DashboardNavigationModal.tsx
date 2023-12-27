import Modal from "./Modal";
import classes from "../../../styles/component/ui/Modals/MainNavigationModal.module.css";
import { DASHBOARD_MAIN_NAVIGATION_ITEMS } from "../../../utils/Constant";
import ArrrowIcon from "../../icons/ArrrowIcon";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSendLogoutMutation } from "../../../redux/auth/auth.api";

type DashboardNavigationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DashboardNavigationModal = ({
  isOpen,
  onClose,
}: DashboardNavigationModalProps) => {
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await sendLogout({});
      // Assuming sendLogout was successful
      onClose(); // Close the modal
      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.error("Logout failed:", error);
      // Handle logout failure if needed
    }
  };

  return (
    <Modal onClose={onClose} isOpened={isOpen} position="bottom">
      {Object.entries(DASHBOARD_MAIN_NAVIGATION_ITEMS).map(
        ([key, { url, name }]) => (
          <Link
            className={classes["nav-item"]}
            key={key}
            to={url}
            onClick={onClose}
          >
            <div className={classes["nav-item-inner"]}>
              {name}
              <ArrrowIcon className={classes["arrow"]} size="large" />
            </div>
          </Link>
        )
      )}

      <Link
        className={classes["nav-item"]}
        key="my-site"
        to="/"
        onClick={onClose}
      >
        <div className={classes["nav-item-inner"]}>
          My site
          <ArrrowIcon className={classes["arrow"]} size="large" />
        </div>
      </Link>

      <div className={classes["button-wrapper"]}>
        <Button
          className={classes["logout-button"]}
          variant="outlined"
          size="large"
          onClick={handleLogout} // Use the updated handleLogout function
        >
          <LogoutIcon />
          <span>Logout</span>
        </Button>
        <Button
          className={classes["close-button"]}
          variant="outlined"
          size="large"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default DashboardNavigationModal;
