import type { VFC } from "react";
import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router";

import Progress from "@/components/common/progress/Progress";
import { UserContext } from "@/contexts";
import { ErrorBoundary } from "@/ErrorBoundary";
import paths from "@/paths";

export const AppRouter: VFC = () => {
  const { user } = useContext(UserContext);
  const FavoriteList = lazy(() => import("@/components/FavoriteList"));
  const FavoriteLists = lazy(() => import("@/components/FavoriteLists"));
  const MakeFavoriteList = lazy(() => import("@/components/MakeFavoriteList"));
  const Signin = lazy(() => import("@/components/Signin"));

  return (
    <ErrorBoundary>
      <Suspense fallback={<Progress />}>
        <Routes>
          <Route path={paths.favoriteList} element={<FavoriteList />} />
          <Route path={paths.favoriteLists} element={<FavoriteLists />} />
          <Route
            path={paths.home}
            element={user ? <MakeFavoriteList /> : <Signin />}
          />
          <Route path="*" element={user ? <MakeFavoriteList /> : <Signin />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
