import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import type { FC } from "react";
import React from "react";
import type { Playlist } from "services/models/playlist";
import type { Song } from "services/models/song";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      margin: theme.spacing(2, 0),
    },
    gridlist: {
      width: 360,
      height: 360,
    },
    gridimage: {
      width: "100%",
    },
  };
});
interface Tile {
  src: string;
  alt: string;
}
const GridImage: FC<{ playlist?: Playlist; song?: Song }> = ({
  playlist,
  song,
}) => {
  const classes = useStyles();
  if (playlist) {
    const tile: Tile[] = playlist.songs.map((v) => {
      return {
        src: v.artworkUrl600 || "",
        alt: v.trackName,
      };
    });
    tile.splice(4, 0, {
      src: playlist.image?.replace("_normal", "") || "",
      alt: playlist.twitterId,
    });

    return (
      <>
        <GridList
          cols={3}
          spacing={0}
          className={classes.gridlist}
          cellHeight={120}
        >
          {tile.map((item: Tile, index) => {
            return (
              <GridListTile key={`${item.src}-${index}`} cols={1}>
                <img src={item.src} alt={item.alt} />
              </GridListTile>
            );
          })}
        </GridList>
      </>
    );
  }
  return (
    <>
      <GridList
        cols={3}
        spacing={0}
        className={classes.gridlist}
        cellHeight={120}
      >
        <GridListTile cols={3} rows={3}>
          <img src={song?.artworkUrl600 || ""} alt={song?.trackName || ""} />
        </GridListTile>
      </GridList>
    </>
  );
};
const MakeImage: FC<{ playlist?: Playlist; song?: Song }> = ({
  playlist,
  song,
}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <GridImage playlist={playlist} song={song} />
      </div>
    </>
  );
};

export default MakeImage;
