import { styled } from "@mui/system";
import type { VFC } from "react";
import React, { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router";

import Progress from "@/components/common/progress/Progress";
import { FirebaseContext, UserContext } from "@/contexts";
import { ErrorBoundary } from "@/ErrorBoundary";
import paths from "@/paths";

const FavoriteList = lazy(() => import("@/components/FavoriteList"));
const FavoriteLists = lazy(() => import("@/components/FavoriteLists"));
const MakeFavoriteList = lazy(() => import("@/components/MakeFavoriteList"));
const Signin = lazy(() => import("@/components/Signin"));

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
});

export const AppRouter: VFC = () => {
  const { user } = useContext(UserContext);
  const { isLoading } = useContext(FirebaseContext);

  if (isLoading) {
    return (
      <Container>
        <Progress />
      </Container>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <Container>
            <Progress />
          </Container>
        }
      >
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
