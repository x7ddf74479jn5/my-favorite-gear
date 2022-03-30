import type { VFC } from "react";
import React, { useContext } from "react";
import { Route, Routes } from "react-router";

import FavoriteList from "@/components/FavoriteList";
import FavoriteLists from "@/components/FavoriteLists";
import MakeFavoriteList from "@/components/MakeFavoriteList";
import Signin from "@/components/Signin";
import { UserContext } from "@/contexts";
import paths from "@/paths";

export const AppRouter: VFC = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path={paths.favoriteList} element={<FavoriteList />} />
      <Route path={paths.favoriteLists} element={<FavoriteLists />} />
      <Route
        path={paths.home}
        element={user ? <MakeFavoriteList /> : <Signin />}
      />
      <Route path="*" element={user ? <MakeFavoriteList /> : <Signin />} />
    </Routes>
  );
};
