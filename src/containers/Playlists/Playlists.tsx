import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SongCard from "components/common/card/SongCard";
import MakeImage from "components/common/makeImage/MakeImage";
import Progress from "components/common/progress/Progress";
import usePlaylists from "hooks/use-playlists";
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
const PlaylistContainer: FC = () => {
  const classes = useStyles();
  const playlists = usePlaylists();
  if (playlists.loading) return <Progress />;
  return (
    <>
      <Typography variant="h5" gutterBottom align="center">
        みんなのMy Favorite gear
      </Typography>
      {playlists.playlists.length === 0 ? (
        <Typography paragraph align="center" color="textSecondary">
          My Favorite gearがありません。
        </Typography>
      ) : (
        playlists.playlists.map((playlist) => {
          return (
            <div key={playlist.id}>
              <Typography variant="h6" gutterBottom align="center">
                {playlist.twitterId}のMy Favorite gear
              </Typography>
              <MakeImage playlist={playlist} />
              <SongCard song={playlist.songs[0]} />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                component={Link}
                to={`${paths.playlistRoot}${playlist.id}`}
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

export default PlaylistContainer;
