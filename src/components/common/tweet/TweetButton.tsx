import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import type { FC } from "react";
import React from "react";
import { TwitterShareButton } from "react-share";

import paths from "@/paths";
import type { FavoriteList } from "@/services/models/favoriteList";

const useStyles = makeStyles((theme) => {
  return {
    share: {
      margin: theme.spacing(2, 0),
      display: "flex",
      justifyContent: "center",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  };
});

const TweetButton: FC<{ favoriteList: FavoriteList }> = ({ favoriteList }) => {
  const classes = useStyles();
  const url = `${paths.urlDomain}${paths.favoriteListRoot}${favoriteList.id}`;
  const limit = 3;
  const title =
    `${favoriteList.twitterId}のMy Favorite Gear\n${favoriteList.gears
      .filter((_, i) => {
        return i < limit;
      })
      .map((v, i) => {
        return `『${i + 1}: ${v.productName}』`;
      })
      .join("\n")}` + "\n…全部見る→";

  return (
    <div className={classes.share}>
      <TwitterShareButton
        title={title}
        url={url}
        hashtags={["my_favorite_gear"]}
      >
        <Button
          component="div"
          variant="contained"
          color="primary"
          startIcon={<TwitterIcon />}
        >
          ツイート
        </Button>
      </TwitterShareButton>
    </div>
  );
};

export default TweetButton;
