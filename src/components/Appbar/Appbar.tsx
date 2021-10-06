import React, { useCallback } from "react";
import {
  styled,
  AppBar,
  Toolbar,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const SearchTextField = styled(TextField)({
  "& input": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: 0,
      background: "rgba(255, 255, 255, 0.15)",
    },
    "&:hover fieldset": {
      borderWidth: 0,
      background: "rgba(255, 255, 255, 0.25)",
    },
    "&.Mui-focused fieldset": {
      borderWidth: 0,
    },
  },
});

interface AppbarProps {
  allCountries: any[];
  setSelectedCountries: (value: any) => void;
}

export function Appbar({
  allCountries,
  setSelectedCountries,
}: AppbarProps): React.ReactElement {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        if (event.target.value.trim() === "") {
          setSelectedCountries([]);
        } else {
          setSelectedCountries(
            allCountries.filter((country) =>
              country.name
                .toLowerCase()
                .includes(event.target.value.trim().toLowerCase())
            )
          );
        }
      }
    },
    [allCountries, setSelectedCountries]
  );

  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>
          Country Map
        </Typography>
        <Autocomplete
          id="search_field"
          freeSolo
          options={allCountries.map((country: any) => country.name)}
          renderInput={(params) => (
            <SearchTextField
              {...params}
              placeholder="Search Countries"
              InputProps={{
                ...params.InputProps,
                type: "search",
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "white" }} />
                  </InputAdornment>
                ),
              }}
            />
          )}
          size="small"
          sx={{ width: "200px" }}
          onKeyDown={handleKeyDown}
        />
      </Toolbar>
    </AppBar>
  );
}