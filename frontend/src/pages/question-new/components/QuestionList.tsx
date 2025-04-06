"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { useAppSelector } from "@/modules/stores";
import { getQuestions } from "@/api/question";
import QuestionDialog, {
  QuestionDetail,
} from "@/components/dialog/QuestionDialog";

export default function QuestionList() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionDetail | null>(null);
  const reduxTrace = useAppSelector((state) => state.question.trace);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);

  // 获取题目追踪数据
  const fetchTraceData = async () => {
    if (!reduxTrace.sourceId) return;
    try {
      const res = await getQuestions({ source_id: reduxTrace.sourceId });
      if (res.data && res.data.length > 0) {
        const tempquestions = res.data.map((item: any) => ({
          id: item.id,
          question: item.content,
          difficulty: item.difficulty,
          creator: item.creator,
          type: item.type,
          subject: item.subject,
          grade: item.grade,
          options: item.options,
          answer: item.answer,
          explanation: item.explanation,
        }));
        setQuestions(tempquestions);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("获取题目追踪失败:", error);
    }
  };

  useEffect(() => {
    if (!reduxTrace.isEditing) {
      fetchTraceData(); // 只在不编辑时获取数据

      // 只在非编辑模式下设置轮询
      if (!pollingRef.current) {
        pollingRef.current = setInterval(() => {
          if (!reduxTrace.isEditing) {
            // 在间隔内再次检查
            fetchTraceData();
          }
        }, 2000);
      }
    } else {
      // 编辑时清除间隔
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    }

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [reduxTrace.sourceId, reduxTrace.isEditing]); // 添加 isEditing 作为依赖项

  const handleEdit = (q: QuestionDetail) => {
    setSelectedQuestion({
      id: q.id,
      question: q.question,
      type: q.type,
      grade: q.grade,
      subject: q.subject,
      options: q.options,
      difficulty: q.difficulty,
      answer: q.answer,
      creator: q.creator,
      explanation: q.explanation,
    });
    setDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>生成的问题</CardTitle>
            <CardDescription>已生成 {questions.length} 个问题</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="overflow-y-auto max-h-[510px] pr-1">
          {questions.map((q) => (
            <Card key={q.id} className="border border-muted mb-2 shadow-sm">
              <CardHeader className="p-3 pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Badge
                        variant="outline"
                        className="text-xs font-normal px-1.5 py-0"
                      >
                        {q.type}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{q.question}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      handleEdit(q);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    // onClick={() => handleDelete(q.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </CardContent>
      <QuestionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selectedQuestion}
        mode="edit"
      />
    </Card>
  );
}
