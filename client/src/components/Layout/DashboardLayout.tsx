import { Outlet } from "react-router-dom";
import DashboardHeader from "./Header/DashboardHeader";
import DashboardFooter from "./Footer/DashboardFooter";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardHeader />
      <main>
        <Outlet />
      </main>
      <DashboardFooter />
    </div>
  );
};

export default DashboardLayout;
