import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/modules/stores";
import { QuestionDetail } from "@/components/dialog/QuestionDialog";

export interface TestPaperState {
  title: string;
  subject?: string;
  timeLimit?: number;
  grade?: string;
  description: string;
  instructions?: string;
  questionlist?: number[];
  questions?: QuestionDetail[];
}

const initialState: TestPaperState = {
  title: "",
  subject: "all",
  timeLimit: 0,
  grade: "all",
  description: "",
  instructions: "",
  questionlist: [],
  questions: [],
};

const testpaperSlice = createSlice({
  name: "testpaper",
  initialState,
  reducers: {
    // 更新标题
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    // 更新学科
    setSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload;
    },
    // 更新时间限制
    setTimeLimit: (state, action: PayloadAction<number>) => {
      state.timeLimit = action.payload;
    },
    // 更新年级
    setGrade: (state, action: PayloadAction<string>) => {
      state.grade = action.payload;
    },
    // 更新描述
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    // 更新指示
    setInstructions: (state, action: PayloadAction<string>) => {
      state.instructions = action.payload;
    },
    // 更新题目列表（题目ID）
    setQuestionList: (state, action: PayloadAction<number[]>) => {
      state.questionlist = action.payload;
    },
    addQuestionList: (state, action: PayloadAction<number>) => {
      state.questionlist = [...(state.questionlist || []), action.payload];
    },
    // 更新题目详细信息
    setQuestions: (state, action: PayloadAction<QuestionDetail[]>) => {
      state.questions = action.payload;
    },
    // 重置所有状态为初始值
    resetTestPaper: (state) => {
      state = initialState;
    },
  },
});

export const {
  setTitle,
  setSubject,
  setTimeLimit,
  setGrade,
  setDescription,
  setInstructions,
  setQuestionList,
  addQuestionList,
  setQuestions,
  resetTestPaper,
} = testpaperSlice.actions;

export const selectTestPaperState = (state: RootState) => state.testpaper;

export default testpaperSlice.reducer;
