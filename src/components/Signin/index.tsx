import { Twitter } from "@mui/icons-material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { signInWithRedirect, TwitterAuthProvider } from "firebase/auth";
import type { VFC } from "react";
import React from "react";

import { brandColor } from "@/asset/variables";
import { useAuth } from "@/lib/firebase";

const ButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const Signin: VFC = () => {
  const auth = useAuth();

  const handleLogin = () => {
    const provider = new TwitterAuthProvider();
    provider.setCustomParameters({ lang: "ja" });
    signInWithRedirect(auth, provider).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`code:${errorCode}, message:${errorMessage}`);
    });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: (theme) => theme.spacing(1),
        marginBottom: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(2),
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Typography align="center" gutterBottom variant="h4">
        ログイン
      </Typography>
      <Typography paragraph align="center" color="textSecondary">
        「My Favorite
        Gear」のご利用にはログインが必須です。Twitterアカウントでログインできます。
      </Typography>
      <ButtonWrapper>
        <Button
          variant="contained"
          startIcon={<Twitter width={18} height={18} />}
          sx={{
            marginTop: (theme) => theme.spacing(2),
            marginLeft: (theme) => theme.spacing(2),
            marginRight: (theme) => theme.spacing(2),
            paddingTop: (theme) => theme.spacing(1),
            paddingBottom: (theme) => theme.spacing(1),
            paddingLeft: (theme) => theme.spacing(2),
            paddingRight: (theme) => theme.spacing(2),
            backgroundColor: brandColor.twitter,
            color: (theme) => theme.palette.common.white,
          }}
          onClick={handleLogin}
        >
          Sign in with Twitter
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default Signin;
