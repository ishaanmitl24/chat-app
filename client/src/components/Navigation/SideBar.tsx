import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { navigationArr } from "../../data/data";
import classes from "../Navigation/SideBar.module.css";
import { Icon } from "@iconify/react";
import UserNavDetails from "../UserNavDetails/UserNavDetails";

const SideBarContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.24);
  box-sizing: border-box;
  z-index: 100;
  width: 170px;
  min-height: 100vh;
`;

const SideBar: React.FC<{}> = () => {
  return (
    <SideBarContainer>
      <div className={classes.logo}>V</div>
      <div className={classes.navList}>
        {navigationArr.map((item) => (
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${classes.active} ${classes.navitem}`
                : classes.navitem
            }
            style={{ textDecoration: "none" }}
            to={item.path}
          >
            <Icon className={classes.icon} icon={item.icon} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <UserNavDetails />
    </SideBarContainer>
  );
};

export default SideBar;
