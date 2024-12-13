import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "8c0aac41";
const BASE_URL = "http://www.omdbapi.com/";

interface MovieState {
  movies: any[];
  loading: boolean;
}

const initialState: MovieState = {
  movies: [],
  loading: false,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesData: (state, action: PayloadAction<any[]>) => {
      state.movies = action.payload;
    },
    setLoading: (state, action: PayloadAction<any[]>) => {
      state.loading = action.payload;
    },
    reset: (state) => {
      state.movies = [];
      state.loading = false;
    },
  },
});

export const getMoviesAsync = (searchTerm: string) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(BASE_URL, {
      params: { apikey: API_KEY, s: searchTerm },
    });
    console.log(response.data);
    dispatch(getMoviesData(response.data));
  } catch (err) {
    console.error(err);
    throw new Error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const reduxReset = () => async (dispatch) => {
  dispatch(reset());
};

export const { getMoviesData, setLoading, reset } = movieSlice.actions;


export default movieSlice.reducer;
