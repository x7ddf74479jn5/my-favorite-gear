import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core/styles";
import type { FC } from "react";
import React from "react";
import type { FavoriteList } from "services/models/favoriteList";
import type { Gear } from "services/models/gear";

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
const GridImage: FC<{ favoriteList?: FavoriteList; gear?: Gear }> = ({
  favoriteList,
  gear,
}) => {
  const classes = useStyles();
  if (favoriteList) {
    const tile: Tile[] = favoriteList.gears.map((v) => {
      return {
        src: v.mediumImageUrl || "",
        alt: v.productName,
      };
    });
    tile.splice(4, 0, {
      src: favoriteList.image?.replace("_normal", "") || "",
      alt: favoriteList.twitterId,
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
          <img src={gear?.mediumImageUrl || ""} alt={gear?.productName || ""} />
        </GridListTile>
      </GridList>
    </>
  );
};
const MakeImage: FC<{ favoriteList?: FavoriteList; gear?: Gear }> = ({
  favoriteList,
  gear,
}) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <GridImage favoriteList={favoriteList} gear={gear} />
      </div>
    </>
  );
};

export default MakeImage;
