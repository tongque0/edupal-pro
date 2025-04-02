// src/pages/question-bank/components/TestPaperCard.tsx
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPaperCard({ item }: { item: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{item.title}</CardTitle>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {[item.subject, `${item.questions} 道题`, item.creator, `创建于 ${item.created}`].map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-400/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">保存</Button>
        <Link to={`/testpaper/detail`}>
          <Button size="sm">查看详情</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
