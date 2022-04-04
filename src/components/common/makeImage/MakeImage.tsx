import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import type { VFC } from "react";
import React, { memo } from "react";

import type { FavoriteList } from "@/services/models/favoriteList";
import type { Gear } from "@/services/models/gear";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-around",
  margin: theme.spacing(2, 0),
}));

interface Tile {
  src: string;
  alt: string;
}
const GridImage: VFC<{ favoriteList?: FavoriteList; gear?: Gear }> = ({
  favoriteList,
  gear,
}) => {
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
        <Grid
          container
          columns={3}
          spacing={0}
          sx={{ width: 360, height: 360 }}
        >
          {tile.map((item: Tile, index) => {
            return (
              <Grid item key={`${item.src}-${index}`} columns={1}>
                <img src={item.src} alt={item.alt} />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container columns={3} spacing={0} sx={{ width: 360, height: 360 }}>
        <Grid item columns={3}>
          <img src={gear?.mediumImageUrl || ""} alt={gear?.productName || ""} />
        </Grid>
      </Grid>
    </>
  );
};

const MakeImage: VFC<{ favoriteList?: FavoriteList; gear?: Gear }> = ({
  favoriteList,
  gear,
}) => {
  return (
    <>
      <Root>
        <GridImage favoriteList={favoriteList} gear={gear} />
      </Root>
    </>
  );
};

export default memo(MakeImage);
