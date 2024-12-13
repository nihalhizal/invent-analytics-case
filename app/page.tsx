"use client";

import { getMoviesAsync } from "@/store/slices/movieSlice";
import { useEffect, useState } from "react";
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

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { movies, loading } = useSelector((state: any) => state.movies);
  const [searchTitle, setSearchTitle] = useState("Pokemon");
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

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
      <Paper className="filter-paper">
        <Box>
          <InputLabel>Search by Name</InputLabel>
          <TextField
            variant="outlined"
            value={searchTitle}
            onChange={(e: any) => setSearchTitle(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel>Filter by Release Date</InputLabel>
          <TextField
            variant="outlined"
            value={yearFilter}
            onChange={(e: any) => setYearFilter(e.target.value)}
          />
        </Box>
        <Box>
          <InputLabel>Filter by Type</InputLabel>
          <FormControl className="w-48">
            <Select
              value={typeFilter}
              onChange={(e: any) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="movie">Movies</MenuItem>
              <MenuItem value="series">TV Series</MenuItem>
              <MenuItem value="episode">TV Series Episodes</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <Paper className="grid-paper">
        <DataGrid
          rows={movies.map((movie: any, index: number) => ({
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
            setPaginationModel(model)
          }
          pageSizeOptions={[10, 20, 50]}
          loading={loading}
        />
      </Paper>
    </div>
  );
};

export default Home;
