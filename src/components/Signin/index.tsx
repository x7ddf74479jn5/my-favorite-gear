import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase";
import type { FC } from "react";
import React from "react";

import { TwitterLogo } from "@/asset/TwitterLogo";
import { brandColor } from "@/asset/variables";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
    loginButton: {
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      backgroundColor: brandColor.twitter,
      color: theme.palette.common.white,
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "center",
    },
  };
});

const Signin: FC = () => {
  const classes = useStyles();

  const handleLogin = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    provider.setCustomParameters({ lang: "ja" });
    firebase
      .auth()
      .signInWithRedirect(provider)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`code:${errorCode}, message:${errorMessage}`);
      });
  };

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Typography align="center" gutterBottom variant="h4">
        ログイン
      </Typography>
      <Typography paragraph align="center" color="textSecondary">
        「My Favorite
        Gear」のご利用にはログインが必須です。Twitterアカウントでログインできます。
      </Typography>
      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          startIcon={<TwitterLogo width={18} height={18} />}
          className={classes.loginButton}
          onClick={handleLogin}
        >
          Sign in with Twitter
        </Button>
      </div>
    </Container>
  );
};

export default Signin;
