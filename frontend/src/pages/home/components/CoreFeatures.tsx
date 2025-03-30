// components/CoreFeatures.tsx
import { Blend, FileText, BookOpen } from "lucide-react";

export default function CoreFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              核心功能
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              我们的平台为学生和教师提供强大的工具，助力高效学习与教学。
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
          {/* 卡片 1 - AI题目生成 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center justify-center w-20 h-20 mt-6 bg-primary/10 rounded-full">
              <Blend className="h-10 w-10 text-primary" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-dark">AI题目生成</h3>
              <p className="mt-4 text-muted-foreground">
                使用我们的先进AI技术，生成高质量的题目，适用于任何主题。
              </p>
            </div>
          </div>
          {/* 卡片 2 - 试卷创建 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center justify-center w-20 h-20 mt-6 bg-primary/10 rounded-full">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-dark">试卷创建</h3>
              <p className="mt-4 text-muted-foreground">
                轻松创建和定制试卷，利用我们丰富的题库。
              </p>
            </div>
          </div>
          {/* 卡片 3 - 题库 */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="flex items-center justify-center w-20 h-20 mt-6 bg-primary/10 rounded-full">
              <BookOpen className="h-10 w-10 text-primary" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-dark">题库</h3>
              <p className="mt-4 text-muted-foreground">
                访问一个不断扩展的题库，题目按科目和主题分类。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
