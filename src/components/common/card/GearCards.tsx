import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import type { VFC } from "react";
import React from "react";

import type { Gear } from "@/services/models/gear";

import GearCard from "./GearCard";

interface GearCardsProps {
  gears: Gear[];
  addButton?: (gear: Gear) => void;
  favoriteList?: Gear[];
  removeButton?: (gear: Gear) => void;
  upButton?: (gear: Gear) => void;
  downButton?: (gear: Gear) => void;
}

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  margin: theme.spacing(2, 0),
}));

const Bottom = styled("div")(({ theme }) => ({
  margin: theme.spacing(4),
}));

const GearCards: VFC<GearCardsProps> = ({
  gears,
  addButton,
  favoriteList,
  removeButton,
  upButton,
  downButton,
}) => {
  return (
    <Root>
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
        <Bottom>
          <Typography>表示できるアイテムがありません。</Typography>
        </Bottom>
      )}
    </Root>
  );
};

export default GearCards;
