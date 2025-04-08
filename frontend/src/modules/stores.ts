// 使用教程
// 1. 在你的组件中导入 `useAppDispatch` 和 `useAppSelector`
//    import { useAppDispatch, useAppSelector } from '@/modules/stores';

// 2. 使用 `useAppDispatch` 获取 `dispatch` 函数
//    const dispatch = useAppDispatch();

// 3. 使用 `useAppSelector` 获取 `state`，例如获取主题和语言
//    const theme = useAppSelector((state) => state.global.theme);
//    const language = useAppSelector((state) => state.global.language);

// 4. 使用 `dispatch` 更新 `state`
//    dispatch(setTheme('dark')); // 更新主题为 dark
//    dispatch(setLanguage('zh')); // 更新语言为中文

// 5. 如果需要获取整个 `global` 状态，可以使用 `selectGlobal`
//    const globalState = useAppSelector(selectGlobal); // 获取整个 global state


// 引入 Redux 和 React-Redux 必要的库
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import authReducer from '@/modules/auth';
import globalReducer from '@/modules/global';
import questionReducer from '@/modules/question';
import testpaperReducer from '@/modules/testpaper';
// 组合多个 reducer，这里只有一个 global reducer
const reducer = combineReducers({
  auth:authReducer,
  global: globalReducer,
  question: questionReducer,
  testpaper: testpaperReducer,
});

// 配置 Redux store
export const store = configureStore({
  reducer,
});

// 类型定义
export type RootState = ReturnType<typeof store.getState>; // 获取整个 Redux store 的类型
export type AppDispatch = typeof store.dispatch; // 获取 dispatch 函数的类型

// 自定义 hooks，提供类型安全的 dispatch 和 selector
export const useAppDispatch = () => useDispatch<AppDispatch>(); // 获取 dispatch 函数
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // 获取 state

// 导出 store 供应用使用
export default store;


