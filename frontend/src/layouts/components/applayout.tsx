import { memo } from "react";
import Content from "@/layouts/components/approuter";
import Header from "@/layouts/components/header";
import  Footer  from "@/layouts/components/footer";
export const TopLayout = memo(() => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <Content />
    </main>
    <Footer />
  </div>
));

TopLayout.displayName = "TopLayout";
