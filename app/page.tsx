"use client";

import { getMoviesAsync } from "@/store/slices/movieSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import {
  setSearchTitle,
  setYearFilter,
  setTypeFilter,
  setPaginationModel,
} from "@/store/slices/filterSlice";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { movies, loading } = useSelector((state: any) => state.movies);
  const { searchTitle, yearFilter, typeFilter, paginationModel } = useSelector(
    (state: any) => state.filters
  );

  useEffect(() => {
    dispatch(
      getMoviesAsync({ title: searchTitle, year: yearFilter, type: typeFilter })
    );
  }, [dispatch, searchTitle, yearFilter, typeFilter]);

  const handleRowClick = (params: any) => {
    router.push(`/movie-detail/${params.row.imdbID}`);
  };

  const columns = [
    { field: "title", headerName: "Name", flex: 2 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "year", headerName: "Release Date", flex: 1 },
    { field: "imdbID", headerName: "IMDb ID", flex: 1 },
  ];

  return (
    <div className="main-page">
      <Paper elevation={0} className="filter-paper">
        <Box>
          <InputLabel>Search by Name</InputLabel>
          <TextField
            variant="outlined"
            value={searchTitle}
            onChange={(e: any) => dispatch(setSearchTitle(e.target.value))}
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

      <Paper elevation={0} className="grid-paper">
        <DataGrid
          rows={movies?.map((movie: any, index: number) => ({
            id: index,
            title: movie.Title,
            type: movie.Type,
            year: movie.Year,
            imdbID: movie.imdbID,
          }))}
          columns={columns}
          onRowClick={handleRowClick}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={(model: GridPaginationModel) =>
            dispatch(setPaginationModel(model))
          }
          pageSizeOptions={[10, 20, 50]}
          loading={loading}
        />
      </Paper>
    </div>
  );
};

export default Home;
