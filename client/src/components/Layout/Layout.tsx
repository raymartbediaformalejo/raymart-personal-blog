import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import classes from "../../styles/component/Layout.module.css";
import { DASHBOARD } from "../../utils/Constant";

const Layout = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.includes(DASHBOARD);
  const isSinglePostPage = pathname.includes("/article/");

  const classMain = `${isSinglePostPage ? classes["no-padding"] : ""}`;

  let content;

  if (!isDashboard) {
    content = (
      <>
        <Header />
        <main className={classMain}>
          <Outlet />
        </main>
        <Footer />
      </>
    );
  } else {
    content = <Outlet />;
  }
  return (
    <div className={classes["main"]}>
      <div className={classes["main-wrapper"]}>{content}</div>
    </div>
  );
};

export default Layout;
