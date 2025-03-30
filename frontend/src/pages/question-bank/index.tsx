import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Brain, FileText, Search } from "lucide-react";

export default function QuestionBankPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">题库</h1>

          <div className="flex items-center gap-2">
            <Link to="/testpaper/new">
              <Button>新建试卷</Button>
            </Link>
            <Link to="/question/new">
              <Button>新建题目</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>筛选条件</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">科目</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="选择科目" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有科目</SelectItem>
                    <SelectItem value="math">数学</SelectItem>
                    <SelectItem value="science">科学</SelectItem>
                    <SelectItem value="history">历史</SelectItem>
                    <SelectItem value="geography">地理</SelectItem>
                    <SelectItem value="literature">文学</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">难度</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="选择难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有难度</SelectItem>
                    <SelectItem value="easy">简单</SelectItem>
                    <SelectItem value="medium">中等</SelectItem>
                    <SelectItem value="hard">困难</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">题目类型</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有类型</SelectItem>
                    <SelectItem value="multiple-choice">选择题</SelectItem>
                    <SelectItem value="true-false">判断题</SelectItem>
                    <SelectItem value="short-answer">简答题</SelectItem>
                    <SelectItem value="essay">作文题</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">创建者</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="选择创建者" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">所有用户</SelectItem>
                    <SelectItem value="me">我</SelectItem>
                    <SelectItem value="teachers">教师</SelectItem>
                    <SelectItem value="students">学生</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">应用筛选</Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="搜索题目或试卷..."
                  className="w-full pl-8"
                />
              </div>
              <Select defaultValue="newest">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">最新优先</SelectItem>
                  <SelectItem value="oldest">最旧优先</SelectItem>
                  <SelectItem value="popular">最受欢迎</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="questions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="questions">题目</TabsTrigger>
                <TabsTrigger value="test-papers">试卷</TabsTrigger>
              </TabsList>
              <TabsContent value="questions" className="space-y-4">
                {[
                  {
                    question: "法国的首都是哪里？",
                    type: "选择题",
                    subject: "地理",
                    difficulty: "简单",
                    creator: "教师",
                  },
                  {
                    question: "解释光合作用的过程。",
                    type: "作文题",
                    subject: "科学",
                    difficulty: "中等",
                    creator: "教师",
                  },
                  {
                    question: "解方程：2x + 5 = 15",
                    type: "简答题",
                    subject: "数学",
                    difficulty: "简单",
                    creator: "学生",
                  },
                  {
                    question: "《罗密欧与朱丽叶》的作者是谁？",
                    type: "选择题",
                    subject: "文学",
                    difficulty: "简单",
                    creator: "教师",
                  },
                  {
                    question: "地球围绕太阳旋转。",
                    type: "判断题",
                    subject: "科学",
                    difficulty: "简单",
                    creator: "教师",
                  },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {item.question}
                        </CardTitle>
                        <Brain className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/10 dark:text-blue-400 dark:ring-blue-400/30">
                          {item.subject}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10 dark:bg-yellow-900/10 dark:text-yellow-400 dark:ring-yellow-400/30">
                          {item.type}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-900/10 dark:text-green-400 dark:ring-green-400/30">
                          {item.difficulty}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-400/30">
                          {item.creator}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="ghost" size="sm">
                        保存
                      </Button>
                      <Link to={`/question/${i}`}>
                        <Button size="sm">查看详情</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="test-papers" className="space-y-4">
                {[
                  {
                    title: "地理测验",
                    description: "关于世界地理的10道题",
                    subject: "地理",
                    questions: 10,
                    creator: "教师",
                    created: "2天前",
                  },
                  {
                    title: "数学测试 - 代数",
                    description: "涵盖基础代数概念的测试",
                    subject: "数学",
                    questions: 15,
                    creator: "教师",
                    created: "1周前",
                  },
                  {
                    title: "科学测验 - 生物学",
                    description: "关于细胞和生物体的问题",
                    subject: "科学",
                    questions: 12,
                    creator: "学生",
                    created: "3天前",
                  },
                  {
                    title: "文学期末考试",
                    description: "关于经典文学的综合测试",
                    subject: "文学",
                    questions: 20,
                    creator: "教师",
                    created: "1个月前",
                  },
                ].map((item, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{item.title}</CardTitle>
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/10 dark:text-blue-400 dark:ring-blue-400/30">
                          {item.subject}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-700/10 dark:bg-green-900/10 dark:text-green-400 dark:ring-green-400/30">
                          {item.questions} 道题
                        </span>
                        <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-400/30">
                          {item.creator}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-700/10 dark:bg-gray-900/10 dark:text-gray-400 dark:ring-gray-400/30">
                          创建于 {item.created}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="ghost" size="sm">
                        保存
                      </Button>
                      <Link to={`/testpaper/detail`}>
                        <Button size="sm">查看详情</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
