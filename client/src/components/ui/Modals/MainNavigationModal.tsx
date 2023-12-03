import Modal from "./Modal";
import classes from "../../../styles/component/ui/Modals/MainNavigationModal.module.css";
import { NAVIGATION_ITEMS } from "../../../utils/Constant";
import ArrrowIcon from "../../icons/ArrrowIcon";
import Button from "../Button";

type MainNavigationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
const MainNavigationModal = ({ isOpen, onClose }: MainNavigationModalProps) => {
  return (
    <Modal onClose={onClose} isOpened={isOpen} position="bottom">
      {Object.entries(NAVIGATION_ITEMS).map(([key, { url, name }]) => (
        <a className={classes["nav-item"]} key={key} href={url}>
          <div className={classes["nav-item-inner"]}>
            {name}
            <ArrrowIcon className={classes["arrow"]} size="large" />
          </div>
        </a>
      ))}

      <div className={classes["button-wrapper"]}>
        <Button
          className={classes["close-button"]}
          variant="outlined"
          size="large"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default MainNavigationModal;
