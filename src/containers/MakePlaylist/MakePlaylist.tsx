import Typography from "@material-ui/core/Typography";
import SongCards from "components/common/card/SongCards";
import MakeImage from "components/common/makeImage/MakeImage";
import Progress from "components/common/progress/Progress";
import TweetButton from "components/common/tweet/TweetButton";
import SearchBox from "components/MakePlaylist/SearchBox";
import useITunes from "hooks/use-iTunes";
import usePlaylist from "hooks/use-playlist";
import type { FC } from "react";
import React from "react";
import type { User } from "services/models/user";

const MakePlaylistContainer: FC<{ user: User }> = ({ user }) => {
  const iTunes = useITunes();
  const playlist = usePlaylist({
    id: user.id,
    image: user.photoUrl,
    twitterId: user.screenName,
  });
  return (
    <>
      <Typography variant="h6" gutterBottom align="center">
        iTunesから検索
      </Typography>
      <SearchBox hundler={iTunes.searchSongs} />
      {iTunes.loading ? (
        <Progress />
      ) : (
        <SongCards
          songs={iTunes.iTunesSongs}
          addButton={playlist.addSong}
          playlist={playlist.playlist.songs}
        />
      )}
      {playlist.playlist.songs.length > 0 ? (
        <>
          <Typography variant="h6" gutterBottom align="center">
            {user.screenName}のオタクソング8選 ({playlist.playlist.songs.length}
            曲)
          </Typography>
          {playlist.playlist.songs.length === 8 ? (
            <>
              <MakeImage playlist={playlist.playlist} />
              <TweetButton playlist={playlist.playlist} />
            </>
          ) : (
            <Typography paragraph align="center" color="textSecondary">
              オタクソングを「8曲」登録してください。
            </Typography>
          )}
          <SongCards
            songs={playlist.playlist.songs}
            removeButton={playlist.removeSong}
            upButton={playlist.upSong}
            downButton={playlist.downSong}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default MakePlaylistContainer;
