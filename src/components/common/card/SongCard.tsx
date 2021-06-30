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
import type { Song } from "services/models/song";

interface SongCardProps {
  song: Song;
  addButton?: (song: Song) => void;
  playlist?: Song[];
  removeButton?: (song: Song) => void;
  upButton?: (song: Song) => void;
  downButton?: (song: Song) => void;
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

const SongCard: FC<SongCardProps> = ({
  song,
  addButton,
  playlist,
  removeButton,
  upButton,
  downButton,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardRoot}>
      <CardHeader
        avatar={
          song.artworkUrl600 ? (
            <Avatar
              src={song.artworkUrl600}
              alt={song.trackName}
              className={classes.avatar}
            />
          ) : (
            <Avatar className={classes.avatar}>{song.trackName}</Avatar>
          )
        }
        title={song.trackName}
        subheader={`${song.artistName} - ${song.collectionName}`}
      />
      <CardContent>
        {song.previewUrl && (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <audio src={song.previewUrl} controls className={classes.audio} />
        )}
        {upButton && (
          <IconButton
            onClick={() => {
              return upButton(song);
            }}
            size="small"
          >
            <ArrowUpwardIcon />
          </IconButton>
        )}
        {downButton && (
          <IconButton
            onClick={() => {
              return downButton(song);
            }}
            size="small"
          >
            <ArrowDownwardIcon />
          </IconButton>
        )}
        {addButton ? (
          playlist &&
          playlist.filter((playlistSong) => {
            return playlistSong.trackId === song.trackId;
          }).length > 0 ? (
            <Button
              color="secondary"
              startIcon={<ThumbUpIcon />}
              disableElevation
              disabled
            >
              オタクソング8選に登録済み
            </Button>
          ) : (
            <Button
              color="secondary"
              startIcon={<ThumbUpIcon />}
              disableElevation
              onClick={() => {
                return addButton(song);
              }}
            >
              オタクソング8選に登録
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
              return removeButton(song);
            }}
          >
            オタクソング8選から削除
          </Button>
        ) : (
          <></>
        )}
        {song.trackViewUrl && (
          <Button
            component={Link}
            href={song.trackViewUrl}
            startIcon={<LinkIcon />}
            disableElevation
            target="_blank"
            rel="noopener"
          >
            iTunes
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SongCard;
