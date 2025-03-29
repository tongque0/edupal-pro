import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Brain, FileText, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted relative">
          {/* 背景图片和蒙层 */}
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
                  <Link to="/signup">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      开始使用
                    </Button>
                  </Link>
                  <Link to="/question-bank">
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
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-dark">
                    AI题目生成
                  </h3>
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

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  适合人群
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  我们的平台旨在帮助学生和教师
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>学生</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>• 使用AI生成的题目进行个性化练习</p>
                  <p>• 根据学习需求创建定制化试卷</p>
                  <p>• 追踪学习进度，识别薄弱环节</p>
                  <p>• 访问丰富的学科题库</p>
                </CardContent>
                <CardFooter>
                  <Link to="/signup?role=student" className="w-full">
                    <Button className="w-full">注册为学生</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>教师</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>• 利用AI生成题目节省时间</p>
                  <p>• 创建多样化的试卷，适应不同难度要求</p>
                  <p>• 为班级构建个性化题库</p>
                  <p>• 减少工作量，保证教育质量</p>
                </CardContent>
                <CardFooter>
                  <Link to="/signup?role=teacher" className="w-full">
                    <Button className="w-full">注册为教师</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
