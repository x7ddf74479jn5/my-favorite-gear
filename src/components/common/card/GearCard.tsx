import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import type { FC } from "react";
import React from "react";
import type { Gear } from "services/models/gear";

interface GearCardProps {
  gear: Gear;
  addButton?: (gear: Gear) => void;
  favoriteList?: Gear[];
  removeButton?: (gear: Gear) => void;
  upButton?: (gear: Gear) => void;
  downButton?: (gear: Gear) => void;
}

const useStyles = makeStyles((theme) => {
  return {
    cardRoot: {
      width: "100%",
      margin: theme.spacing(1, 0),
    },
    avatar: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
    audio: { width: "100%" },
  };
});

const GearCard: FC<GearCardProps> = ({
  gear,
  addButton,
  favoriteList,
  removeButton,
  upButton,
  downButton,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardRoot}>
      <CardHeader
        avatar={
          gear.mediumImageUrl ? (
            <Avatar
              src={gear.mediumImageUrl}
              alt={gear.productName}
              className={classes.avatar}
            />
          ) : (
            <Avatar className={classes.avatar}>{gear.productName}</Avatar>
          )
        }
        title={gear.productName}
        subheader={`${gear.makerName}`}
      />
      <CardContent>
        {/* {gear.previewUrl && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio src={gear.previewUrl} controls className={classes.audio} />
        )} */}
        {upButton && (
          <IconButton
            onClick={() => {
              return upButton(gear);
            }}
            size="small"
          >
            <ArrowUpwardIcon />
          </IconButton>
        )}
        {downButton && (
          <IconButton
            onClick={() => {
              return downButton(gear);
            }}
            size="small"
          >
            <ArrowDownwardIcon />
          </IconButton>
        )}
        {addButton ? (
          favoriteList &&
          favoriteList.filter((favoriteListGear) => {
            return favoriteListGear.productId === gear.productId;
          }).length > 0 ? (
            <Button
              color="secondary"
              startIcon={<ThumbUpIcon />}
              disableElevation
              disabled
            >
              My Favorite Gearに登録済み
            </Button>
          ) : (
            <Button
              color="secondary"
              startIcon={<ThumbUpIcon />}
              disableElevation
              onClick={() => {
                return addButton(gear);
              }}
            >
              My Favorite Gearに登録
            </Button>
          )
        ) : (
          <></>
        )}
        {removeButton ? (
          <Button
            color="inherit"
            startIcon={<DeleteIcon />}
            disableElevation
            onClick={() => {
              return removeButton(gear);
            }}
          >
            My Favorite Gearから削除
          </Button>
        ) : (
          <></>
        )}
        {gear.affiliateUrl && (
          <Button
            component={Link}
            href={gear.affiliateUrl}
            startIcon={<LinkIcon />}
            disableElevation
            target="_blank"
            rel="noopener"
          >
            楽天
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default GearCard;
