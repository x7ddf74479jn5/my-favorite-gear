import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import paths from "paths";
import type { FC } from "react";
import React from "react";
import { TwitterShareButton } from "react-share";
import type { FavoriteList } from "services/models/favoriteList";

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
  let title = `${favoriteList.twitterId}のMy Favorite Gear\n${favoriteList.gears
    .map((v) => {
      if (v.productName.length > 15) {
        return v.productName.slice(0, 15) + "…\n";
      }
      return `『${v.productName}』`;
    })
    .join("\n")}`;
  // 日本語全角140文字制限
  // URL: 11.5 chars(shorten), hashtag: 17 / 2 chars
  const limit = 140;
  if (title.length > limit) {
    title = title.slice(0, limit) + "…\n";
  }

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
