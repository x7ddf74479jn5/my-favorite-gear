import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { FirebaseContext, UserContext } from "contexts";
import paths from "paths";
import type { FC } from "react";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    appbar: {
      background: theme.palette.primary.main,
    },

    titleLink: {
      textDecoration: "none",
      color: "unset",
      flexGrow: 1,
    },
    Avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  };
});
const NavigationBar: FC = () => {
  const classes = useStyles();

  const { auth } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const signOut =
    auth && user
      ? () => {
          auth.signOut();
          history.replace(paths.home);
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
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Link to={paths.home} className={classes.titleLink}>
            <Typography variant="h6" noWrap>
              俺のオタクソング8選
            </Typography>
          </Link>
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
                  className={classes.Avatar}
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
                  オタクソング8選編集
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={`${paths.playlistRoot}${user.id}`}
                  onClick={handleClose}
                >
                  {user.screenName}のオタクソング8選
                </MenuItem>
                <MenuItem
                  component={Link}
                  to={paths.playlists}
                  onClick={handleClose}
                >
                  みんなのオタクソング8選
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
