import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import useCustomContext from "../hooks/useCustomContext";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const { getAllKeywords, keywordApiInfo } = useCustomContext();
  const [keywordsArray, setKeywordsArray] = useState([]);

  //needs to be an array

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {keywordApiInfo && (
        <Autocomplete
          freeSolo
          id="keyword-search-bar"
          disableClearable
          options={keywordApiInfo?.map((option) => option.keyword)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search keywords"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      )}
    </Stack>
  );
}
