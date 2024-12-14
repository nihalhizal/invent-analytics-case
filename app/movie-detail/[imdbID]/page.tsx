"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getMovieDetailAsync } from "@/store/slices/movieSlice";
import { Paper, Box, Typography } from "@mui/material";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { imdbID } = useParams();
  const { movieDetail, loading, error } = useSelector(
    (state: any) => state.movies
  );

  useEffect(() => {
    if (imdbID) {
      dispatch(getMovieDetailAsync(imdbID));
    }
  }, [dispatch, imdbID]);

  if (loading)
    return <Typography className="detail-page">Loading...</Typography>;
  if (error)
    return <Typography className="detail-page">Error: {error}</Typography>;
  if (!movieDetail)
    return <Typography className="detail-page">No movie found!</Typography>;

  const details = [
    { label: "Year", value: movieDetail.Year },
    { label: "Genre", value: movieDetail.Genre },
    { label: "Plot", value: movieDetail.Plot },
    { label: "Director", value: movieDetail.Director },
    { label: "Actors", value: movieDetail.Actors },
    { label: "Language", value: movieDetail.Language },
    { label: "Released", value: movieDetail.Released },
    { label: "Runtime", value: movieDetail.Runtime },
    {
      label: "IMDb Rating",
      value: `${movieDetail.imdbRating} (${movieDetail.imdbVotes} votes)`,
    },
    { label: "Awards", value: movieDetail.Awards },
    { label: "Box Office", value: movieDetail.BoxOffice },
  ];

  return (
    <Box className="detail-page">
      <Paper className="detail-paper">
        <div className="w-1/3">
          <img
            src={movieDetail.Poster}
            alt={movieDetail.Title}
            className="w-full h-auto rounded-2xl"
          />
        </div>

        <div className="w-2/3">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {movieDetail.Title}
          </Typography>

          {details.map((detail, index) => (
            <Typography key={index} gutterBottom>
              <strong>{detail.label}:</strong> {detail.value}
            </Typography>
          ))}
        </div>
      </Paper>
    </Box>
  );
};

export default MovieDetail;
