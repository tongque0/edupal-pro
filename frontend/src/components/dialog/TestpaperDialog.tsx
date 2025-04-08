import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // 假设是您自定义的 Dialog 组件
import { Button } from "@/components/ui/button"; // 自定义 Button 组件
import { Badge } from "@/components/ui/badge"; // 自定义 Badge 组件
import { Download } from "lucide-react";
import { QuestionDetail } from "./QuestionDialog";

export interface TestPaperDetails {
  title: string;
  subject?: string;
  timeLimit?: number;
  grade?: string;
  description: string;
  instructions?: string;
  questions?: QuestionDetail[];
}

interface TestPaperProps {
  id?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: TestPaperDetails | null;
}

// 模拟数据
const testPaperData = {
  title: "期中考试",
  description: "本次考试包括选择题、判断题、简答题和论述题。",
  instructions: "请根据题目要求作答，答题时间为90分钟。",
};

export function TestpaperDialog({
  id,
  open,
  onOpenChange,
  data,
}: TestPaperProps) {
  const [testPaper, setTestPaper] = useState<TestPaperDetails | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionDetail[]>(
    []
  );

  // 根据传入的 data 或 id 拉取数据
  useEffect(() => {
    if (data) {
      // 使用传入的 data
      setTestPaper(data);
      setSelectedQuestions(data.questions || []);
    } else {
      // 如果没有传入数据，通过 id 拉取数据
      if (id) {
        setTestPaper(testPaperData);
        // setSelectedQuestions(questionsData);
      }
    }
  }, [data]);

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl min-w-[900px] max-h-[800px]  overflow-auto">
          <DialogHeader>
            <DialogTitle>{testPaper?.title || "未命名试卷"}</DialogTitle>
            <DialogDescription>
              {testPaper?.description || "暂无描述。"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-6">
            {testPaper?.instructions && (
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">说明：</h3>
                <p>{testPaper.instructions}</p>
              </div>
            )}

            <div className="space-y-6">
              {selectedQuestions.map((q, index) => (
                <div key={q.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium break-words">
                      {index + 1}. {q.question}
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/10 dark:text-blue-400"
                    >
                      {q.type}
                    </Badge>
                  </div>
                  {q.type === "选择题" && (
                    <div className="space-y-2 ml-6">
                      {["A", "B", "C", "D"].map((option, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {q.type === "判断题" && (
                    <div className="space-y-2 ml-6">
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                        <span>正确</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                        <span>错误</span>
                      </div>
                    </div>
                  )}

                  {q.type === "计算题" && (
                    <div className="ml-6 mt-2">
                      <div className="border border-dashed border-muted-foreground p-2 rounded-md">
                        <p className="text-muted-foreground text-sm">
                          答题区域
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              下载 PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
