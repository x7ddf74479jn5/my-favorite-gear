import Container from "@mui/material/Container";
import type { VFC } from "react";
import React, { useContext } from "react";

import MakeFavoriteListContainer from "@/containers/MakeFavoriteList/MakeFavoriteList";
import { UserContext } from "@/contexts";

const MakeFavoriteList: VFC = () => {
  const { user } = useContext(UserContext);
  if (user === null) return null;
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
      {user && <MakeFavoriteListContainer user={user} />}
    </Container>
  );
};

export default MakeFavoriteList;
