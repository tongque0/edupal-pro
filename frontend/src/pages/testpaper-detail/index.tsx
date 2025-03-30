import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Download, FileText, Share } from "lucide-react"

export default function TestPaperPage({ params }) {
  // 这里通常会根据 ID 获取试卷数据
  const testPaper = {
    id: "1",
    title: "地理测验",
    description: "10道关于世界地理的问题",
    subject: "地理",
    creator: "老师",
    created: "2天前",
    questions: [
      {
        id: 1,
        question: "法国的首都是什么？",
        type: "多项选择",
        options: ["巴黎", "伦敦", "柏林", "马德里"],
        answer: "巴黎",
        difficulty: "简单",
      },
      {
        id: 2,
        question: "下列哪个是最大的海洋？",
        type: "多项选择",
        options: ["大西洋", "印度洋", "北冰洋", "太平洋"],
        answer: "太平洋",
        difficulty: "简单",
      },
      {
        id: 3,
        question: "撒哈拉沙漠位于哪个大陆？",
        type: "多项选择",
        options: ["非洲", "亚洲", "南美洲", "澳大利亚"],
        answer: "非洲",
        difficulty: "简单",
      },
      {
        id: 4,
        question: "珠穆朗玛峰是世界上最高的山。",
        type: "是/否",
        answer: "是",
        difficulty: "简单",
      },
      {
        id: 5,
        question: "列举三个南美洲的国家。",
        type: "简答",
        answer: "巴西、阿根廷、秘鲁（任何三个有效的国家）",
        difficulty: "中等",
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{testPaper.title}</h1>
            <p className="text-muted-foreground">{testPaper.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              分享
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              下载
            </Button>
            <Button size="sm">开始测试</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  试卷详情
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">学科</p>
                    <p>{testPaper.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">创建者</p>
                    <p>{testPaper.creator}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">创建时间</p>
                    <p>{testPaper.created}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">题目数量</p>
                    <p>{testPaper.questions.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>问题</CardTitle>
                <CardDescription>此试卷包含 {testPaper.questions.length} 道问题</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {testPaper.questions.map((q, i) => (
                  <div key={q.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium">
                        {i + 1}. {q.question}
                      </h3>
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/10 dark:text-blue-400 dark:ring-blue-400/30">
                        {q.type}
                      </span>
                    </div>

                    {q.type === "多项选择" && (
                      <div className="space-y-2 ml-6">
                        {q.options.map((option, j) => (
                          <div key={j} className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {q.type === "是/否" && (
                      <div className="space-y-2 ml-6">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                          <span>是</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                          <span>否</span>
                        </div>
                      </div>
                    )}

                    {q.type === "简答" && (
                      <div className="ml-6 mt-2">
                        <div className="border border-dashed border-muted-foreground p-2 rounded-md">
                          <p className="text-muted-foreground text-sm">答案区域</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>操作</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">开始测试</Button>
                <Button variant="outline" className="w-full">
                  编辑试卷
                </Button>
                <Button variant="outline" className="w-full">
                  克隆试卷
                </Button>
                <Button variant="outline" className="w-full">
                  打印试卷
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>答案解析</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2">
                  {testPaper.questions.map((q, i) => (
                    <div key={q.id} className="flex justify-between items-center py-1 border-b last:border-0">
                      <span>问题 {i + 1}</span>
                      <span className="font-medium">{q.answer}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  下载答案解析
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>相似试卷</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/test-paper/2" className="block p-2 hover:bg-muted rounded-md">
                  <p className="font-medium">世界地理测验</p>
                  <p className="text-sm text-muted-foreground">12道问题</p>
                </Link>
                <Link to="/test-paper/3" className="block p-2 hover:bg-muted rounded-md">
                  <p className="font-medium">欧洲国家测试</p>
                  <p className="text-sm text-muted-foreground">15道问题</p>
                </Link>
                <Link to="/test-paper/4" className="block p-2 hover:bg-muted rounded-md">
                  <p className="font-medium">地理期末考试</p>
                  <p className="text-sm text-muted-foreground">20道问题</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
