import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import type { VFC } from "react";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { FirebaseContext, UserContext } from "@/contexts";
import paths from "@/paths";

const HomeLink = styled(Link)({
  textDecoration: "none",
  color: "unset",
  flexGrow: 1,
});

const NavigationBar: VFC = () => {
  const { auth } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const signOut =
    auth && user
      ? () => {
          auth.signOut();
          navigate(paths.home);
        }
      : () => {
          return;
        };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar sx={{ background: (theme) => theme.palette.primary.main }}>
        <Toolbar>
          <HomeLink to={paths.home}>
            <Typography variant="h6" noWrap>
              My Favorite Gear
            </Typography>
          </HomeLink>
          {user ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar
                  alt={user.screenName}
                  src={user.photoUrl ? user.photoUrl : ""}
                  sx={{
                    width: (theme) => theme.spacing(4),
                    height: (theme) => theme.spacing(4),
                  }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  component={Link}
                  to={`${paths.home}`}
                  onClick={handleClose}
                >
                  My Favorite Gear編集
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`${paths.favoriteListRoot}${user.id}`}
                  onClick={handleClose}
                >
                  {user.screenName}のMy Favorite Gear
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={paths.favoriteLists}
                  onClick={handleClose}
                >
                  みんなのMy Favorite Gear
                </MenuItem>
                <MenuItem onClick={signOut}>ログアウト</MenuItem>
              </Menu>
            </>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavigationBar;
