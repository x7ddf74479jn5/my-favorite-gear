import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GearCards from "components/common/card/GearCards";
import MakeImage from "components/common/makeImage/MakeImage";
import Progress from "components/common/progress/Progress";
import TweetButton from "components/common/tweet/TweetButton";
import useFavoriteList from "hooks/use-favoriteList";
import paths from "paths";
import type { FC } from "react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import type { Gear } from "services/models/gear";
import { blankGear } from "services/models/gear";
import type { User } from "services/models/user";

const FavoriteListContainer: FC<{ user: User | null }> = ({ user }) => {
  const { id } = useParams<{ id?: string }>();
  const favoriteList = useFavoriteList({
    id: id,
  });
  const [playMusicsGear, setPlayMusicsGear] = useState<Gear>(blankGear);
  const playMusics = () => {
    const musics: HTMLAudioElement[] = Array.prototype.slice.call(
      document.getElementsByTagName("audio")
    );
    musics.forEach((music) => {
      music.pause();
    });
    const playMusic = (n: number) => {
      setPlayMusicsGear(favoriteList.favoriteList.gears[n]);
      musics[n].currentTime = 0;
      musics[n].play();
      const next = () => {
        musics[n].removeEventListener("ended", next);
        n = n + 1;
        if (n >= musics.length) n = 0;
        playMusic(n);
      };
      musics[n].addEventListener("ended", next);
    };
    playMusic(0);
  };
  if (favoriteList.loading) return <Progress />;
  if (favoriteList.favoriteList.gears.length < 8)
    return (
      <>
        <Typography variant="h6" gutterBottom align="center">
          {favoriteList.favoriteList.twitterId}のMy Favorite gear
        </Typography>
        <Typography paragraph align="center" color="textSecondary">
          8アイテム選ばれていません。
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          component={Link}
          to={paths.home}
        >
          {user && user.id === favoriteList.favoriteList.id
            ? "編集"
            : "お気に入りリストを作る"}
        </Button>
      </>
    );

  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        {favoriteList.favoriteList.twitterId}のMy Favorite gear
      </Typography>
      {playMusicsGear.mediumImageUrl ? (
        <MakeImage gear={playMusicsGear} />
      ) : (
        <MakeImage favoriteList={favoriteList.favoriteList} />
      )}
      <Typography align="center">{playMusicsGear.productName}</Typography>
      <Typography align="center">{playMusicsGear.makerName}</Typography>

      {playMusicsGear.productName === "" && (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            return playMusics();
          }}
        >
          連続再生
        </Button>
      )}

      <TweetButton favoriteList={favoriteList.favoriteList} />

      <GearCards gears={favoriteList.favoriteList.gears} />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        component={Link}
        to={paths.home}
      >
        {user && user.id === favoriteList.favoriteList.id
          ? "編集"
          : "自分もMy Favorite gearを作る"}
      </Button>
    </>
  );
};

export default FavoriteListContainer;
