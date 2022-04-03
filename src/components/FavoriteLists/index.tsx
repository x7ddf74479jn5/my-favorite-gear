import Container from "@mui/material/Container";
import type { VFC } from "react";
import React from "react";

import FavoriteListsContainer from "@/containers/FavoriteLists/FavoriteLists";

const FavoriteLists: VFC = () => {
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
      <FavoriteListsContainer />
    </Container>
  );
};

export default FavoriteLists;
