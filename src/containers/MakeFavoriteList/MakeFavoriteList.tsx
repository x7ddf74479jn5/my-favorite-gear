import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import type { FC } from "react";
import React from "react";

import GearCards from "@/components/common/card/GearCards";
import MakeImage from "@/components/common/makeImage/MakeImage";
import Progress from "@/components/common/progress/Progress";
import TweetButton from "@/components/common/tweet/TweetButton";
import SearchBox from "@/components/MakeFavoriteList/SearchBox";
import useFavoriteList from "@/hooks/use-favoriteList";
import useRakutenSearch from "@/hooks/use-rakutenSearch";
import type { User } from "@/services/models/user";

const useStyles = makeStyles(() => {
  return {
    text: {
      wordBreak: "keep-all",
    },
  };
});

const MakeFavoriteListContainer: FC<{ user: User }> = ({ user }) => {
  const rakutenSearch = useRakutenSearch();
  const favoriteList = useFavoriteList({
    id: user.id,
    image: user.photoUrl,
    twitterId: user.screenName,
  });
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        商品検索
      </Typography>
      <SearchBox handler={rakutenSearch.searchGears} />
      {rakutenSearch.loading ? (
        <Progress />
      ) : (
        <GearCards
          gears={rakutenSearch.gears}
          addButton={favoriteList.addGear}
          favoriteList={favoriteList.favoriteList.gears}
        />
      )}
      {favoriteList.favoriteList.gears.length > 0 ? (
        <>
          <Typography
            variant="h6"
            gutterBottom
            align="center"
            className={classes.text}
          >
            {user.screenName}のMy Favorite Gear (
            {favoriteList.favoriteList.gears.length}
            アイテム)
          </Typography>
          {favoriteList.favoriteList.gears.length === 8 ? (
            <>
              <MakeImage favoriteList={favoriteList.favoriteList} />
              <TweetButton favoriteList={favoriteList.favoriteList} />
            </>
          ) : (
            <Typography paragraph align="center" color="textSecondary">
              My Favorite Gearを「8アイテム」登録してください。
            </Typography>
          )}
          <GearCards
            gears={favoriteList.favoriteList.gears}
            removeButton={favoriteList.removeGear}
            upButton={favoriteList.upGear}
            downButton={favoriteList.downGear}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MakeFavoriteListContainer;
