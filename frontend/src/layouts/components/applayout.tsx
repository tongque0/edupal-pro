import React from "react";
import Content from "@/layouts/components/approuter";
import Header from "@/layouts/components/header";
import Footer from "@/layouts/components/footer";
import { Layout } from "@/modules/global";
// 顶部布局（TopLayout）：包括 Header、Content 和 Footer
export const TopLayout = React.memo(() => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Content />
    </main>
    <Footer />
  </div>
));

// 全屏布局（FullPageLayout）：只显示内容部分
export const FullPageLayout = React.memo(() => <Content />);

// 侧边布局（SideLayout）需要定义
const SideLayout = React.memo(() => (
  <div className="flex min-h-screen">
    <aside className="w-64 bg-gray-800 text-white">
      {/* 侧边栏内容 */}
    </aside>
    <main className="flex-1">
      <Content />
    </main>
  </div>
));

// 混合布局（MixLayout）需要定义
const MixLayout = React.memo(() => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1 flex">
      <aside className="w-64 bg-gray-800 text-white">
        {/* 侧边栏内容 */}
      </aside>
      <div className="flex-1">
        <Content />
      </div>
    </main>
    <Footer />
  </div>
));

// 导出不同布局的映射
export default {
  [Layout.full]: FullPageLayout,
  [Layout.top]: TopLayout,
  [Layout.side]: SideLayout,
  [Layout.mix]: MixLayout,
};
