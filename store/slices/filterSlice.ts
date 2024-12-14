import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  searchTitle: string;
  yearFilter: string;
  typeFilter: string;
  paginationModel: {
    page: number;
    pageSize: number;
  };
}

const initialState: FilterState = {
  searchTitle: "Pokemon",
  yearFilter: "",
  typeFilter: "",
  paginationModel: {
    page: 0,
    pageSize: 10,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchTitle(state: any, action: PayloadAction<string>) {
      state.searchTitle = action.payload;
    },
    setYearFilter(state: any, action: PayloadAction<string>) {
      state.yearFilter = action.payload;
    },
    setTypeFilter(state: any, action: PayloadAction<string>) {
      state.typeFilter = action.payload;
    },
    setPaginationModel(
      state: any,
      action: PayloadAction<{ page: number; pageSize: number }>
    ) {
      state.paginationModel = action.payload;
    },
  },
});

export const {
  setSearchTitle,
  setYearFilter,
  setTypeFilter,
  setPaginationModel,
} = filterSlice.actions;

export default filterSlice.reducer;
