// utils/request.js
import axios from "axios";
import proxy from '@/configs/host';

const env = (import.meta.env.MODE || 'development') as keyof typeof proxy;
const API_HOST = proxy[env].API;
const TIMEOUT = 5000;
// 创建 axios 实例
const request = axios.create({
  baseURL: API_HOST , // 你可以根据需求修改 baseURL
  timeout: TIMEOUT, // 设置请求超时时间
  withCredentials: true,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // 响应拦截器
// request.interceptors.response.use(
//   (response) => {
//     return response; // 直接返回响应数据
//   },
//   (error) => {
//     // 统一处理错误
//     if (error.response) {
//       // 请求已发出，但是服务器响应状态码非 2xx
//       console.error("Response error:", error.response);
//     } else if (error.request) {
//       // 请求已发出，但是没有收到响应
//       console.error("Request error:", error.request);
//     } else {
//       // 发生错误时
//       console.error("Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

export default request;
