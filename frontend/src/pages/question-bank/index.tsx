import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FilterCard from "@/pages/question-bank/components/FilterCard";
import TestPaperCard from "@/pages/question-bank/components/TestPaperCard";
import QuestionTable from "@/pages/question-bank/components/QuestionsTable";

export default function QuestionBankPage() {


  const paperList = [
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
  ];

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
          <FilterCard />

          <div className="space-y-6">
            {/* <SearchAndSortBar /> */}

            <Tabs defaultValue="questions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="questions">题目</TabsTrigger>
                <TabsTrigger value="test-papers">试卷</TabsTrigger>
              </TabsList>

              <TabsContent value="questions" className="space-y-4">
                <QuestionTable />
              </TabsContent>

              <TabsContent value="test-papers" className="space-y-4">
                {paperList.map((item, i) => (
                  <TestPaperCard key={i} item={item} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
