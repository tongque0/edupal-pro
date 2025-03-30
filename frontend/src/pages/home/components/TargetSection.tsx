// components/TargetAudience.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function TargetAudience() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              适合人群
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              我们的平台旨在帮助各类用户，根据不同需求提供个性化的解决方案。
            </p>
          </div>
        </div>

        {/* 改进的卡片展示 - 添加动态效果和更好的视觉层次 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
          {/* 学生卡片 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden">
            <div className="absolute h-1 bg-primary w-0 group-hover:w-full transition-all duration-300 top-0 left-0"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  学生
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                使用AI生成的题目进行个性化练习
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                根据学习需求创建定制化试卷
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                追踪学习进度，识别薄弱环节
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span> 访问丰富的学科题库
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                variant="ghost"
                className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
              >
                了解更多
              </Button>
            </CardFooter>
          </Card>

          {/* 教师卡片 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden">
            <div className="absolute h-1 bg-primary w-0 group-hover:w-full transition-all duration-300 top-0 left-0"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  教师
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                利用AI生成题目节省时间
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                创建多样化的试卷，适应不同难度要求
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                为班级构建个性化题库
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                减少工作量，保证教育质量
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                variant="ghost"
                className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
              >
                了解更多
              </Button>
            </CardFooter>
          </Card>

          {/* 家长卡片 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden">
            <div className="absolute h-1 bg-primary w-0 group-hover:w-full transition-all duration-300 top-0 left-0"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  家长
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                了解孩子学习进度和薄弱点
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                辅助孩子高效学习，提升成绩
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                跟踪作业完成情况和学习效果
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                获取专业的学习建议和方法
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                variant="ghost"
                className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
              >
                了解更多
              </Button>
            </CardFooter>
          </Card>

          {/* 教育管理者卡片 */}
          <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary overflow-hidden">
            <div className="absolute h-1 bg-primary w-0 group-hover:w-full transition-all duration-300 top-0 left-0"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors duration-300">
                  教育管理者
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                智能分析教学效果与学习数据
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                全面监控学生群体学习进度
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                科学制定教育规划与策略
              </p>
              <p className="flex items-center text-sm md:text-base">
                <span className="text-primary mr-2">✓</span>{" "}
                提升整体教学质量与效率
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                variant="ghost"
                className="w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
              >
                了解更多
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">
            准备好提升您的教育体验了吗？
          </h3>
          <p className="mb-6 text-muted-foreground max-w-3xl mx-auto">
            无论您是学生、教师、家长还是教育管理者，我们的AI智能题目生成系统都能为您提供专业的教育解决方案。
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            立即开始免费试用
          </Button>
        </div>
      </div>
    </section>
  );
}
