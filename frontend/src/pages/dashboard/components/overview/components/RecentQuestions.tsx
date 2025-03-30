import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const RecentQuestions = () => {
  const recentQuestions = [
    { question: "法国的首都是哪里？", subject: "地理", type: "选择题" },
    { question: "《杀死一只知更鸟》的作者是谁？", subject: "文学", type: "选择题" },
    { question: "水的沸点是多少？", subject: "科学", type: "判断题" },
    { question: "泰坦尼克号沉没于哪一年？", subject: "历史", type: "选择题" },
    { question: "太阳系中最大的行星是什么？", subject: "天文学", type: "选择题" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>最近的问题</CardTitle>
        <CardDescription>您最近生成或互动过的问题</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentQuestions.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.question}</p>
                <p className="text-sm text-muted-foreground">{item.subject} • {item.type}</p>
              </div>
              <Link to={`/question/${i}`}>
                <Button variant="ghost" size="sm">查看</Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/question-bank">
          <Button variant="outline">查看所有问题</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentQuestions;
