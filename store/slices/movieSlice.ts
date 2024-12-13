import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "8c0aac41";
const BASE_URL = "http://www.omdbapi.com/";

interface Movie {
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface MovieDetail {
  Title: string;
  Poster: string;
  Year: string;
  Genre: string;
  Plot: string;
  Director: string;
  Actors: string;
  Language: string;
  Released: string;
  Runtime: string;
  imdbRating: string;
  imdbVotes: string;
  Awards: string;
  BoxOffice: string;
}

interface InitialState {
  movies: Movie[];
  movieDetail: MovieDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  movies: [],
  movieDetail: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state: any, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.error = null;
    },
    setMovieDetail: (state: any, action: PayloadAction<MovieDetail>) => {
      state.movieDetail = action.payload;
      state.error = null;
    },
    setLoading: (state: any, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: any, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const getMoviesAsync =
  ({ title, year, type }: { title: string; year?: string; type?: string }) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          s: title,
          y: year,
          type,
        },
      });
      if (response.data.Response === "True") {
        dispatch(setMovies(response.data.Search));
      } else {
        dispatch(setError(response.data.Error));
        dispatch(setMovies([]));
      }
    } catch (err) {
      console.error(err);
      dispatch(setError("Failed to fetch movies. Please try again."));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getMovieDetailAsync = (imdbID: string) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
      },
    });
    if (response.data.Response === "True") {
      dispatch(setMovieDetail(response.data));
    } else {
      dispatch(setError(response.data.Error));
      dispatch(setMovieDetail(null));
    }
  } catch (err) {
    console.error(err);
    dispatch(setError("Failed to fetch movie details. Please try again."));
  } finally {
    dispatch(setLoading(false));
  }
};

export const { setMovies, setMovieDetail, setLoading, setError } =
  movieSlice.actions;

export default movieSlice.reducer;
