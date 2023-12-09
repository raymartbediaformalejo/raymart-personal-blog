import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import classes from "../../styles/component/Layout.module.css";
import { DASHBOARD } from "../../utils/Constant";

const Layout = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes(DASHBOARD);

  return (
    <div className={classes["main"]}>
      <div className={classes["main-wrapper"]}>
        {!isDashboard && <Header />}
        <main>
          <Outlet />
        </main>
        {!isDashboard && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
