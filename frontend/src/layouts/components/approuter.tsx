import React, { JSX, Suspense, memo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import routers from "@/router"; // 假设你有一个路由配置文件

const AppRouter = () => (
  <div>
    <Suspense>
      <Routes>
        {routers.map((route, index) => {
          const { path, component: Component, redirect } = route as { path: string; component: React.LazyExoticComponent<() => JSX.Element>; redirect?: string };

          if (redirect) {
            return (
              <Route
                key={index}
                path={path}
                element={<Navigate to={redirect} replace />}
              />
            );
          }

          if (Component) {
            return <Route key={index} path={path} element={<Component />} />;
          }

          return null;
        })}
      </Routes>
    </Suspense>
  </div>
);

export default memo(AppRouter);
