import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/modules/stores";

export interface QuestionFilters {
  subject: string;
  difficulty: string;
  type: string;
  creator: string;
  search: string;
  orderBy?: string; // 可选的排序字段
  page?: string; // 可选的分页字段
  pageSize?: string; // 可选的分页字段
}

export interface QuestionState {
  filters: QuestionFilters;
}

const initialState: QuestionState = {
  filters: {
    subject: "all",
    difficulty: "all",
    type: "all",
    creator: "all",
    search: "",
    orderBy: "newest", // 默认按创建时间排序
  },
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setFilter(
      state,
      action: PayloadAction<{ key: keyof QuestionFilters; value: string }>
    ) {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const { setFilter, resetFilters } = questionSlice.actions;

export const selectQuestionState = (state: RootState) => state.question;

export default questionSlice.reducer;
