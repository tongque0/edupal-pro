"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/modules/stores";
import { getQuestions, getTrace } from "@/api/question";
import { setTrace } from "@/modules/question";

type QuestionType = string;

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  question: string;
  type: QuestionType;
  subject?: string;
  grade?: string;
  options?: string;
  answer?: string;
}

export default function QuestionList() {
  const reduxTrace = useAppSelector((state) => state.question.trace);
  const [isPolling, setIsPolling] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // 获取题目追踪数据
  const fetchTraceData = async () => {
    try {
      const res = await getQuestions({ source_id: reduxTrace.sourceId });
      console.log("获取题目追踪数据:", res.data);
      if (res.data && res.data.length > 0) {
        const tempquestions = res.data.map((item: any) => {
          return {
            id: item.id,
            question: item.content,
            type: item.type,
            subject: item.subject,
            grade: item.grade,
            options: item.options,
            answer: item.answer,
          };
        });
        setQuestions(tempquestions);
      } else {
        setQuestions([]); // 如果没有数据，清空问题列表
      }
      // 如果有返回数据且不为空，更新问题列表
    } catch (error) {
      console.error("获取题目追踪失败:", error);
      stopPolling();
    }
  };

  // 开始轮询
  const startPolling = () => {
    if (!isPolling && reduxTrace.sourceId) {
      setIsPolling(true);

      // 立即执行一次获取
      fetchTraceData();

      // 设置2秒间隔的轮询
      pollingRef.current = setInterval(() => {
        fetchTraceData();
      }, 2000);
    }
  };

  // 停止轮询
  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    setIsPolling(false);
  };

  // 监听 sourceId 变化
  useEffect(() => {
    if (reduxTrace.sourceId) {
      startPolling();
    }
    return () => {
      stopPolling();
    };
  }, [reduxTrace.sourceId]);

  const [questions, setQuestions] = useState<Question[]>([]);

  const renderQuestionContent = (question: Question) => {
    switch (question.type) {
      case "选择题":
        return (
          <div className="space-y-1 mt-2">
            {question.options?.split(";").map((option, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div
                  className={cn(
                    "h-3 w-3 rounded-full border flex-shrink-0",
                    question.answer?.includes(String.fromCharCode(65 + index))
                      ? "bg-primary border-primary"
                      : "border-muted-foreground"
                  )}
                />
                <span>{option}</span>
              </div>
            ))}
          </div>
        );
      case "判断":
        return (
          <div className="space-y-1 mt-2">
            <div className="flex items-center space-x-2 text-sm">
              <div
                className={cn(
                  "h-3 w-3 rounded-full border flex-shrink-0",
                  question.answer === "是"
                    ? "bg-primary border-primary"
                    : "border-muted-foreground"
                )}
              />
              <span>是</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div
                className={cn(
                  "h-3 w-3 rounded-full border flex-shrink-0",
                  question.answer === "否"
                    ? "bg-primary border-primary"
                    : "border-muted-foreground"
                )}
              />
              <span>否</span>
            </div>
          </div>
        );
      case "填空":
      case "计算":
        return (
          <div className="mt-2">
            <p className="text-xs font-medium">答案：</p>
            <p className="text-xs text-muted-foreground">{question.answer}</p>
          </div>
        );
      default:
        return null;
    }
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
              </CardHeader>

              <CardContent className="p-3 pt-0">
                {renderQuestionContent(q)}
              </CardContent>

              {/* <CardFooter className="flex justify-between items-center pt-2">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  查看答案
                </Button>
              </CardFooter> */}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
