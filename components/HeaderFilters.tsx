"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import {
  setSearchTitle,
  setYearFilter,
  setTypeFilter,
} from "@/store/slices/filterSlice";

const HeaderFilters = () => {
  const dispatch = useAppDispatch();
  const { searchTitle, yearFilter, typeFilter } = useAppSelector(
    (state: any) => state.filters
  );

  return (
    <Paper elevation={0} className="filter-paper">
      <Box>
        <InputLabel>Search by Name</InputLabel>
        <TextField
          variant="outlined"
          value={searchTitle}
          onChange={(e: any) => dispatch(setSearchTitle(e.target.value))}
          error={searchTitle?.length < 3}
          helperText={
            searchTitle?.length < 3 &&
            "Too many results. Please enter at least 3 characters."
          }
        />
      </Box>
      <Box>
        <InputLabel>Filter by Release Date</InputLabel>
        <TextField
          variant="outlined"
          value={yearFilter}
          onChange={(e: any) => dispatch(setYearFilter(e.target.value))}
        />
      </Box>
      <Box>
        <InputLabel>Filter by Type</InputLabel>
        <FormControl className="w-48">
          <Select
            value={typeFilter}
            onChange={(e: any) => dispatch(setTypeFilter(e.target.value))}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="movie">Movies</MenuItem>
            <MenuItem value="series">TV Series</MenuItem>
            <MenuItem value="episode">TV Series Episodes</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export default HeaderFilters;
