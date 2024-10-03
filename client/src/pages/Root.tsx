import { Outlet } from "react-router-dom";
import SideBar from "../components/Navigation/SideBar";

const Root = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        width: "100%",
      }}
    >
      <SideBar />
      <div style={{ position: "relative", width: "100%", height: "inherit" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
