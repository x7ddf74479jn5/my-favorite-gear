import TwitterIcon from "@mui/icons-material/Twitter";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import type { FC } from "react";
import React from "react";
import { TwitterShareButton } from "react-share";

import paths from "@/paths";
import type { FavoriteList } from "@/services/models/favoriteList";

const Share = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "center",
  "& > *": {
    margin: theme.spacing(1),
  },
}));

const TweetButton: FC<{ favoriteList: FavoriteList }> = ({ favoriteList }) => {
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
    <Share>
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
    </Share>
  );
};

export default TweetButton;
