import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import type { FC } from "react";
import React from "react";
import type { Gear } from "services/models/gear";

import GearCard from "./GearCard";

interface GearCardsProps {
  gears: Gear[];
  addButton?: (gear: Gear) => void;
  favoriteList?: Gear[];
  removeButton?: (gear: Gear) => void;
  upButton?: (gear: Gear) => void;
  downButton?: (gear: Gear) => void;
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
const GearCards: FC<GearCardsProps> = ({
  gears,
  addButton,
  favoriteList,
  removeButton,
  upButton,
  downButton,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {gears.length > 0 ? (
        gears.map((gear, index, self) => {
          return (
            <GearCard
              gear={gear}
              addButton={addButton}
              removeButton={removeButton}
              favoriteList={favoriteList}
              upButton={index === 0 ? undefined : upButton}
              downButton={index + 1 === self.length ? undefined : downButton}
              key={gear.productId}
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

export default GearCards;
