import "../App.css";
import Button from "@mui/material/Button";
import { NavLink, Outlet } from "react-router-dom";
import { Fragment } from "react";

const SavingsLayout: React.FC = () => {
  return (
    <Fragment>
      <div className="container">
        <NavLink
          to={"/saving"}
          className={({ isActive }) => `text-link ${isActive ? "active" : ""}`}
        >
          <Button variant="contained">Saving Plan</Button>
        </NavLink>
        <NavLink
          to={"/saving/getplans"}
          className={({ isActive }) => `text-link ${isActive ? "active" : ""}`}
        >
          <Button variant="contained">Get Saving Plans</Button>
        </NavLink>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </Fragment>
  );
};
export default SavingsLayout;
