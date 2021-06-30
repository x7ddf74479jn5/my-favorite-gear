import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SongCards from "components/common/card/SongCards";
import MakeImage from "components/common/makeImage/MakeImage";
import Progress from "components/common/progress/Progress";
import TweetButton from "components/common/tweet/TweetButton";
import usePlaylist from "hooks/use-playlist";
import paths from "paths";
import type { FC } from "react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import type { Song } from "services/models/song";
import { blankSong } from "services/models/song";
import type { User } from "services/models/user";

const PlaylistContainer: FC<{ user: User | null }> = ({ user }) => {
  const { id } = useParams<{ id?: string }>();
  const playlist = usePlaylist({
    id: id,
  });
  const [playMusicsSong, setPlayMusicsSong] = useState<Song>(blankSong);
  const playMusics = () => {
    const musics: HTMLAudioElement[] = Array.prototype.slice.call(
      document.getElementsByTagName("audio")
    );
    musics.forEach((music) => {
      music.pause();
    });
    const playMusic = (n: number) => {
      setPlayMusicsSong(playlist.playlist.songs[n]);
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
  if (playlist.loading) return <Progress />;
  if (playlist.playlist.songs.length < 8)
    return (
      <>
        <Typography variant="h6" gutterBottom align="center">
          {playlist.playlist.twitterId}のオタクソング8選
        </Typography>
        <Typography paragraph align="center" color="textSecondary">
          8曲選ばれていません。
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          component={Link}
          to={paths.home}
        >
          {user && user.id === playlist.playlist.id
            ? "編集"
            : "お気に入りリストを作る"}
        </Button>
      </>
    );

  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        {playlist.playlist.twitterId}のオタクソング8選
      </Typography>
      {playMusicsSong.artworkUrl600 ? (
        <MakeImage song={playMusicsSong} />
      ) : (
        <MakeImage playlist={playlist.playlist} />
      )}
      <Typography align="center">{playMusicsSong.trackName}</Typography>
      <Typography align="center">{playMusicsSong.artistName}</Typography>

      {playMusicsSong.trackName === "" && (
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

      <TweetButton playlist={playlist.playlist} />

      <SongCards songs={playlist.playlist.songs} />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        component={Link}
        to={paths.home}
      >
        {user && user.id === playlist.playlist.id
          ? "編集"
          : "俺もオタクソング8選を作る"}
      </Button>
    </>
  );
};

export default PlaylistContainer;
