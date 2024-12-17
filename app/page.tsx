"use client";

import { getMoviesAsync } from "@/store/slices/movieSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Paper } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { setPaginationModel } from "@/store/slices/filterSlice";
import HeaderFilters from "@/components/HeaderFilters";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Home = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { movies, loading } = useAppSelector((state: any) => state.movies);
  const { searchTitle, yearFilter, typeFilter, paginationModel } =
    useAppSelector((state: any) => state.filters);

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
      <HeaderFilters />
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
