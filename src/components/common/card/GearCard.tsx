import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import LinkIcon from "@material-ui/icons/Link";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { brandColor } from "asset/variables";
import ReviewStars from "components/common/card/ReviewStars";
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
    content: {
      display: "flex",
      justifyContent: "space-between",
    },
    review: {
      display: "flex",
    },
    linkContainer: {
      display: "flex",
      gap: theme.spacing(2),
      margin: theme.spacing(2, 0, 2, 0),
    },
    amazon: {
      color: "white",
      backgroundColor: brandColor.amazon,
    },
    rakuten: {
      color: "white",
      backgroundColor: brandColor.rakuten,
    },
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
  // const makeStarCount = () => {
  //   if (gear.reviewAverage === null) return;
  //   const integerPart = Math.floor(gear.reviewAverage);
  //   const decimalPart = gear.reviewAverage - integerPart;
  //   let starCount =
  //     decimalPart < 0.25
  //       ? integerPart
  //       : decimalPart < 0.5
  //       ? integerPart + decimalPart
  //       : decimalPart < 0.75
  //       ? integerPart + decimalPart
  //       : Math.ceil(gear.reviewAverage);
  //   const stars = [];
  //   while (starCount > 0) {
  //     if (starCount < 1) {
  //       stars.push(<StarHalfIcon key={starCount} />);
  //       break;
  //     }
  //     stars.push(<StarIcon key={starCount} />);
  //     starCount--;
  //   }

  //   return stars;
  // };
  // const stars = makeStarCount();

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
        subheader={`${gear.makerName}/${gear.brandName}/${gear.genreName}`}
      />
      <CardContent>
        <div className={classes.content}>
          {gear.reviewAverage && (
            <div className={classes.review}>
              <ReviewStars reviewAverage={gear.reviewAverage} />
              <Typography> : {gear.reviewAverage}</Typography>
            </div>
          )}
          {gear.averagePrice && (
            <Typography align="right">
              平均価格: {gear.averagePrice}円
            </Typography>
          )}
        </div>
        <div className={classes.linkContainer}>
          {gear.affiliateUrl && (
            <Button
              className={classes.rakuten}
              component={Link}
              href={gear.affiliateUrl}
              startIcon={<LinkIcon />}
              disableElevation
              target="_blank"
              rel="noopener"
              fullWidth
            >
              楽天で見る
            </Button>
          )}
          {gear.affiliateUrl && (
            <Button
              className={classes.amazon}
              component={Link}
              href={gear.amazonUrl}
              startIcon={<LinkIcon />}
              disableElevation
              target="_blank"
              rel="noopener"
              fullWidth
            >
              Amazonで見る
            </Button>
          )}
        </div>
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
      </CardContent>
    </Card>
  );
};

export default GearCard;
