import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GearCards from "components/common/card/GearCards";
import MakeImage from "components/common/makeImage/MakeImage";
import Progress from "components/common/progress/Progress";
import TweetButton from "components/common/tweet/TweetButton";
import useFavoriteList from "hooks/use-favoriteList";
import paths from "paths";
import type { FC } from "react";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import type { User } from "services/models/user";

const FavoriteListContainer: FC<{ user: User | null }> = ({ user }) => {
  const { id } = useParams<{ id?: string }>();
  const favoriteList = useFavoriteList({
    id: id,
  });

  if (favoriteList.loading) return <Progress />;
  if (favoriteList.favoriteList.gears.length < 8)
    return (
      <>
        <Typography variant="h6" gutterBottom align="center">
          {favoriteList.favoriteList.twitterId}のMy Favorite gear
        </Typography>
        <Typography paragraph align="center" color="textSecondary">
          8アイテム選ばれていません。
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          component={Link}
          to={paths.home}
        >
          {user && user.id === favoriteList.favoriteList.id
            ? "編集"
            : "お気に入りリストを作る"}
        </Button>
      </>
    );

  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        {favoriteList.favoriteList.twitterId}のMy Favorite gear
      </Typography>
      <MakeImage favoriteList={favoriteList.favoriteList} />
      <TweetButton favoriteList={favoriteList.favoriteList} />
      <GearCards gears={favoriteList.favoriteList.gears} />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        component={Link}
        to={paths.home}
      >
        {user && user.id === favoriteList.favoriteList.id
          ? "編集"
          : "自分もMy Favorite gearを作る"}
      </Button>
    </>
  );
};

export default FavoriteListContainer;
