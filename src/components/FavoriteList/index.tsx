import Container from "@mui/material/Container";
import type { VFC } from "react";
import React, { useContext } from "react";

import FavoriteListContainer from "@/containers/FavoriteList/FavoriteList";
import { UserContext } from "@/contexts";

const FavoriteList: VFC = () => {
  const { user } = useContext(UserContext);

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
      <FavoriteListContainer user={user} />
    </Container>
  );
};

export default FavoriteList;
