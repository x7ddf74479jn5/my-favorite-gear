import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import type { FC } from "react";
import React, { memo } from "react";

import type { Gear } from "@/services/models/gear";

type ReviewStarsProps = Pick<Gear, "reviewAverage">;

const ReviewStars: FC<ReviewStarsProps> = ({ reviewAverage }) => {
  if (!reviewAverage || reviewAverage > 5) return null;

  const integerPart = Math.floor(reviewAverage);
  const decimalPart = reviewAverage - integerPart;
  let starCount =
    decimalPart < 0.25
      ? integerPart
      : decimalPart < 0.5
      ? integerPart + decimalPart
      : decimalPart < 0.75
      ? integerPart + decimalPart
      : Math.ceil(reviewAverage);
  const stars = [];
  while (starCount > 0) {
    if (starCount < 1) {
      stars.push(<StarHalfIcon key={starCount} />);
      break;
    }
    stars.push(<StarIcon key={starCount} />);
    starCount--;
  }

  return <>{stars}</>;
};

export default memo(ReviewStars);
