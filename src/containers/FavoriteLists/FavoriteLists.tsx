import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { VFC } from "react";
import React from "react";
import { Link } from "react-router-dom";

import GearCard from "@/components/common/card/GearCard";
import MakeImage from "@/components/common/makeImage/MakeImage";
import Progress from "@/components/common/progress/Progress";
import useFavoriteLists from "@/hooks/use-favoriteLists";
import paths from "@/paths";

const FavoriteListContainer: VFC = () => {
  const favoriteLists = useFavoriteLists();
  if (favoriteLists.loading) return <Progress />;
  return (
    <>
      <Typography variant="h5" gutterBottom align="center">
        みんなのMy Favorite gear
      </Typography>
      {favoriteLists.favoriteLists.length === 0 ? (
        <Typography paragraph align="center" color="textSecondary">
          My Favorite gearがありません。
        </Typography>
      ) : (
        favoriteLists.favoriteLists.map((favoriteList) => {
          return (
            <div key={favoriteList.id}>
              <Typography variant="h6" gutterBottom align="center">
                {favoriteList.twitterId}のMy Favorite gear
              </Typography>
              <MakeImage favoriteList={favoriteList} />
              <GearCard gear={favoriteList.gears[0]} />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                component={Link}
                to={`${paths.favoriteListRoot}${favoriteList.id}`}
                sx={{
                  marginTop: (theme) => theme.spacing(1),
                  marginBottom: (theme) => theme.spacing(4),
                }}
              >
                くわしくみる
              </Button>
            </div>
          );
        })
      )}
    </>
  );
};

export default FavoriteListContainer;
