import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import type { FC } from "react";
import React from "react";
import type { Song } from "services/models/song";

import SongCard from "./SongCard";

interface SongCardsProps {
  songs: Song[];
  addButton?: (song: Song) => void;
  playlist?: Song[];
  removeButton?: (song: Song) => void;
  upButton?: (song: Song) => void;
  downButton?: (song: Song) => void;
}

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: theme.spacing(2, 0),
    },
    bottom: {
      margin: theme.spacing(4),
    },
  };
});
const SongCards: FC<SongCardsProps> = ({
  songs,
  addButton,
  playlist,
  removeButton,
  upButton,
  downButton,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {songs.length > 0 ? (
        songs.map((song, index, self) => {
          return (
            <SongCard
              song={song}
              addButton={addButton}
              removeButton={removeButton}
              playlist={playlist}
              upButton={index === 0 ? undefined : upButton}
              downButton={index + 1 === self.length ? undefined : downButton}
              key={song.trackId}
            />
          );
        })
      ) : (
        <div className={classes.bottom}>
          <Typography>表示できる曲がありません。</Typography>
        </div>
      )}
    </div>
  );
};

export default SongCards;
