import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import type { Theme } from "@material-ui/core/styles";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import type { FC } from "react";
import React, { useState } from "react";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: { display: "flex", margin: theme.spacing(1) },
    input: { flex: 1, paddingLeft: theme.spacing(1) },
  });
});
interface SearchBoxProps {
  handler: (str: string) => void;
}
const SearchBox: FC<SearchBoxProps> = ({ handler }) => {
  const classes = useStyles();
  const [term, setTerm] = useState<string>("");
  const onSubmit = (event: React.FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    handler(term);
  };
  return (
    <Container maxWidth="xs">
      <Paper component="form" className={classes.root} onSubmit={onSubmit}>
        <InputBase
          fullWidth
          className={classes.input}
          placeholder="商品を検索"
          inputProps={{ "aria-label": "商品を検索" }}
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
          }}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Container>
  );
};

export default SearchBox;
