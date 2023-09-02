import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

export default function SearchBar(props) {

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {props.apiInfo && (
        <Autocomplete
          freeSolo
          id="keyword-search-bar"
          disableClearable
          options={props.options}
          onChange={props.onChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.label}
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
