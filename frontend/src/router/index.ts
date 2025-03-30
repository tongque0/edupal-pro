//File path: src/router/index.ts
import { lazy } from "react";

const routers = [
  {
    path: "/",
    component: lazy(() => import("@/pages/home")),
  },
  {
    path: "/auth",
    component: lazy(() => import("@/pages/auth")),
  },
  {
    path: "/dashboard",
    component: lazy(() => import("@/pages/dashboard")), // 使用懒加载
  }
];

export default routers;
