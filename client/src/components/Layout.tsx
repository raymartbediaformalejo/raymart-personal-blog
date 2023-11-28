import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import classes from "../styles/component/Layout.module.css";

const Layout = () => {
  return (
    <main className={classes["main"]}>
      <div className={classes["main-wrapper"]}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
