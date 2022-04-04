import SearchIcon from "@mui/icons-material/Search";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import type { VFC } from "react";
import React, { memo, useState } from "react";

interface SearchBoxProps {
  handler: (str: string) => void;
}
const SearchBox: VFC<SearchBoxProps> = ({ handler }) => {
  const [term, setTerm] = useState<string>("");
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handler(term);
  };
  return (
    <Container maxWidth="xs">
      <Paper
        component="form"
        sx={{ display: "flex", margin: (theme) => theme.spacing(1) }}
        onSubmit={onSubmit}
      >
        <InputBase
          fullWidth
          sx={{ flex: 1, paddingLeft: (theme) => theme.spacing(1) }}
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

export default memo(SearchBox);
