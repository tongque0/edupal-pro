// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted relative">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url(Https://api.kdcc.cn)" }}
      ></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                AI驱动的学习，简单高效
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                通过我们的智能题目生成系统，生成问题、创建试卷并提升学习效果。
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/auth">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  开始使用
                </Button>
              </Link>
              <Link to="/question/bank">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full min-[400px]:w-auto"
                >
                  探索题库
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src="Https://api.kdcc.cn"
              alt="Hero Image"
              width={550}
              height={550}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
