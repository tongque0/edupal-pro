import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/modules/stores";
import request from "@/utils/request"; // 引入封装的 request

const namespace = "user";
const TOKEN_NAME = "token";

const initialState = {
  token: localStorage.getItem(TOKEN_NAME) || "", // 默认token不走权限
  userInfo: {},
};

// 登录请求
export const login = createAsyncThunk(
  `${namespace}/login`,
  async (params: { account: string; password: string }) => {
    const { account, password } = params;

    try {
      // 发起请求时使用封装的 request
      const res = await request.post("/user/signin", {
        username: account,
        password: password,
      });
      // 检查返回的字段名
      if (res.data && res.data.access_token) {
        return res.data.access_token;
      } else {
        throw new Error("登录失败，无效的响应数据结构");
      }
    } catch (error: any) {
      // 检查是否是 401 错误
      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw error; // 抛出错误以便 Redux 异常处理
    }
  }
);

// 获取用户信息请求
export const getUserInfo = createAsyncThunk(
  `${namespace}/me`,
  async () => {
    try {
      const res = await request.get("/user/me"); // 获取用户信息
      if (res.data) {
        return res.data; // 返回用户信息
      } else {
        throw new Error("无法获取用户信息");
      }
    } catch (error: any) {
      throw error; // 抛出错误以便 Redux 异常处理
    }
  }
);

const userSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(TOKEN_NAME);
      state.token = "";
      state.userInfo = {};
    },
    remove: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem(TOKEN_NAME, action.payload); // 存储 token
        state.token = action.payload;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload; // 存储用户信息
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { logout, remove } = userSlice.actions;

export default userSlice.reducer;
