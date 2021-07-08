import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FirebaseContext, UserContext } from "contexts";
import firebase from "firebase/app";
import paths from "paths";
import type { FC } from "react";
import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
    },
  };
});

const Signin: FC = () => {
  const classes = useStyles();

  const { auth } = useContext(FirebaseContext);
  const { setCredential } = useContext(UserContext);
  const history = useHistory();
  const uiConfig: firebaseui.auth.Config = {
    signInFlow: "redirect",
    signInOptions: [
      {
        provider: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        customParameters: { lang: "ja" },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl) => {
        setCredential(authResult as firebase.auth.UserCredential);
        const dest = redirectUrl || paths.home;
        history.replace(dest);

        return false;
      },
    },
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
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </Container>
  );
};

export default Signin;
