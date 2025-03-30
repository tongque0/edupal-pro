import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const RecentTestPapers = () => {
  const recentTestPapers = [
    { title: "地理测验 1", questions: 10, created: "2 天前" },
    { title: "2025 历史考试", questions: 15, created: "1 周前" },
    { title: "数学测试 - 第 3 章", questions: 20, created: "5 天前" },
    { title: "科学测验 - 物理", questions: 12, created: "3 天前" },
    { title: "文学考试 1", questions: 8, created: "1 个月前" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近的试卷</CardTitle>
        <CardDescription>您最近创建或查看的试卷</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTestPapers.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.questions} 道题 • 创建于 {item.created}</p>
              </div>
              <Link to={`/test-paper/${i}`}>
                <Button variant="ghost" size="sm">查看</Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/test-papers">
          <Button variant="outline">查看所有试卷</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentTestPapers;
