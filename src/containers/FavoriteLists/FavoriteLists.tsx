import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import GearCard from "components/common/card/GearCard";
import MakeImage from "components/common/makeImage/MakeImage";
import Progress from "components/common/progress/Progress";
import useFavoriteLists from "hooks/use-favoriteLists";
import paths from "paths";
import type { FC } from "react";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(4),
    },
  };
});
const FavoriteListContainer: FC = () => {
  const classes = useStyles();
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
                className={classes.button}
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
