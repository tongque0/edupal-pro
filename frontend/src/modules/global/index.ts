import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/modules/stores'; // 假设你有一个 stores.ts 文件来配置 Redux store
type Theme = 'dark' | 'light' | 'system';

interface GlobalState {
  theme: Theme;
  language: string;  // 假设我们也想管理语言
}

const initialState: GlobalState = {
  theme: 'system', // 默认主题为 system
  language: 'zn',  // 默认语言为英文
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

// 导出选择器，用于获取主题和语言
export const selectGlobal = (state: RootState) => state.global;
// 导出 action creators
export const { setTheme, setLanguage } = globalSlice.actions;

// 导出 reducer
export default globalSlice.reducer;
