import Modal from "./Modal";
import classes from "../../../styles/component/ui/Modals/MainNavigationModal.module.css";
import { DASHBOARD_MAIN_NAVIGATION_ITEMS } from "../../../utils/Constant";
import ArrrowIcon from "../../icons/ArrrowIcon";
import Button from "../Button";
import { Link } from "react-router-dom";

type DashboardNavigationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const DashboardNavigationModal = ({
  isOpen,
  onClose,
}: DashboardNavigationModalProps) => {
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

      <div className={classes["button-wrapper"]}>
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
