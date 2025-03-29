// router.ts
import path from 'path';
import React from 'react';
import { lazy } from 'react';

const Home = lazy(() => import('@/pages/Home'));  // 使用懒加载
const About = lazy(() => import('@/pages/About'));  // 使用懒加载

const routers = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/redirect',
    redirect: '/about',  // 重定向到 /about
  },
];

export default routers;
