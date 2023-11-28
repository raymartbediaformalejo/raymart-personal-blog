import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import classes from "../styles/component/Layout.module.css";

const Layout = () => {
  return (
    <div className={classes["main"]}>
      <div className={classes["main-wrapper"]}>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
