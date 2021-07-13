import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import paths from "paths";
import type { FC } from "react";
import React from "react";
import { TwitterShareButton } from "react-share";
import type { Playlist } from "services/models/playlist";

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

const TweetButton: FC<{ playlist: Playlist }> = ({ playlist }) => {
  const classes = useStyles();
  const url = `${paths.urlDomain}${paths.playlistRoot}${playlist.id}`;
  const title = `${playlist.twitterId}のMy Favorite Gear\n${playlist.songs
    .map((v) => {
      return `『${v.trackName}』`;
    })
    .join("\n")}`;

  return (
    <div className={classes.share}>
      <TwitterShareButton
        title={title}
        url={url}
        hashtags={["My Favorite Gear"]}
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
