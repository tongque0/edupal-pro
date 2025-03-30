//File path: src/router/index.ts
import { lazy } from "react";

const Home = lazy(() => import("@/pages/home")); // 使用懒加载
const Auth = lazy(() => import("@/pages/auth")); // 使用懒加载
const routers = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/auth",
    component: Auth,
  }
];

export default routers;
