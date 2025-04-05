import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/modules/stores";

export interface QuestionFilters {
  subject: string;
  difficulty: string;
  type: string;
  grade: string; // 可选的年级字段
  creator: string;
  search: string;
  orderBy: string; // 可选的排序字段
  page: string; // 可选的分页字段
  pageSize: string; // 可选的分页字段
}

export interface QuestionTrace {
  isEditing: boolean; // 是否正在编辑题目
  sourceId: string; // 生成的批次 ID
}

export interface QuestionState {
  filters: QuestionFilters;
  trace: QuestionTrace; // 题目生成追踪记录
}

const initialState: QuestionState = {
  filters: {
    subject: "all",
    difficulty: "all",
    type: "all",
    grade: "all", // 默认所有年级
    creator: "all",
    search: "",
    orderBy: "newest", // 默认按创建时间排序
    page: "1", // 默认第一页
    pageSize: "10", // 默认每页10条
  },
  trace: {
    isEditing: false, // 是否正在编辑题目
    sourceId: "", // 生成的批次 ID
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
    setTraceEditing(state, action: PayloadAction<boolean>) {
      state.trace.isEditing = action.payload;
    },
    setTraceSourceId(state, action: PayloadAction<string>) {
      state.trace.sourceId = action.payload;
    },
  },
});

export const { setFilter, resetFilters, setTraceEditing, setTraceSourceId } =
  questionSlice.actions;

export const selectQuestionState = (state: RootState) => state.question;

export default questionSlice.reducer;
