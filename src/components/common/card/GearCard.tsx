import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import type { VFC } from "react";
import React from "react";

import { brandColor } from "@/asset/variables";
import ReviewStars from "@/components/common/card/ReviewStars";
import type { Gear } from "@/services/models/gear";

interface GearCardProps {
  gear: Gear;
  addButton?: (gear: Gear) => void;
  favoriteList?: Gear[];
  removeButton?: (gear: Gear) => void;
  upButton?: (gear: Gear) => void;
  downButton?: (gear: Gear) => void;
}

const Content = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

const Review = styled("div")({
  display: "flex",
});

const LinkContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0, 2, 0),
}));

const GearCard: VFC<GearCardProps> = ({
  gear,
  addButton,
  favoriteList,
  removeButton,
  upButton,
  downButton,
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        margin: (theme) => theme.spacing(1, 0),
      }}
    >
      <CardHeader
        avatar={
          gear.mediumImageUrl ? (
            <Avatar
              src={gear.mediumImageUrl}
              alt={gear.productName}
              sx={{
                width: (theme) => theme.spacing(9),
                height: (theme) => theme.spacing(9),
              }}
            />
          ) : (
            <Avatar
              sx={{
                width: (theme) => theme.spacing(9),
                height: (theme) => theme.spacing(9),
              }}
            >
              {gear.productName}
            </Avatar>
          )
        }
        title={gear.productName}
        subheader={`${gear.makerName}/${gear.brandName}/${gear.genreName}`}
      />
      <CardContent>
        <Content>
          {gear.reviewAverage && (
            <Review>
              <ReviewStars reviewAverage={gear.reviewAverage} />
              <Typography> : {gear.reviewAverage}</Typography>
            </Review>
          )}
          {gear.averagePrice && (
            <Typography align="right">
              平均価格: {gear.averagePrice.toLocaleString()}円
            </Typography>
          )}
        </Content>
        <LinkContainer>
          {gear.affiliateUrl && (
            <Button
              sx={{ color: "white", backgroundColor: brandColor.rakuten }}
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
              sx={{ color: "white", backgroundColor: brandColor.amazon }}
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
        </LinkContainer>
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
