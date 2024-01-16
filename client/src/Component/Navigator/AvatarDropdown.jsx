import { AccountBox, Checklist, Logout } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../store/features/auth.slice";

const AvatarDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    try {
      dispatch(logout());
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    console.log("logout");
    logoutHandler();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 1 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            alt="User Name"
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={"/account/profile"} className="avatar-btn-link">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AccountBox fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>
        </Link>
        <Link to={"/account/subscription"} className="avatar-btn-link">
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Checklist fontSize="small" />
            </ListItemIcon>
            My Subscriptions
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          {" "}
          {/* Add onClick handler */}
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarDropdown;
