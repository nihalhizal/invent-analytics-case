import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movieSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
