// src/modules/stores/globalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/modules/stores"; // 假设你有一个 stores.ts 文件来配置 Redux store

type Theme = "dark" | "light" | "system";

export enum Layout {
  side = 1,
  top,
  mix,
  full,
}
interface GlobalState {
  theme: Theme;
  language: string; // 假设我们也想管理语言
  layout: Layout;
}

const initialState: GlobalState = {
  theme: "system", // 默认主题为 system
  language: "zn", // 默认语言为中文
  layout: Layout.top,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    switchTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    switchLayout: (state, action) => {
      if (action?.payload) {
        state.layout = action?.payload;
      }
    },
  },
});

// 导出选择器，用于获取主题、语言和布局
export const selectGlobal = (state: RootState) => state.global;
// 导出 action creators
export const { switchTheme, setLanguage, switchLayout } = globalSlice.actions;

// 导出 reducer
export default globalSlice.reducer;
