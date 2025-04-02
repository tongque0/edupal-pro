// src/pages/question-bank/components/QuestionCard.tsx
import { Link } from "react-router-dom";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuestionCard({ item, index }: { item: any; index: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{item.question}</CardTitle>
          <Brain className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {[item.subject, item.type, item.difficulty, item.creator].map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-300 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-400/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm">保存</Button>
        <Link to={`/question/${index}`}>
          <Button size="sm">查看详情</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
