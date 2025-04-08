"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/modules/stores";
import type { RootState } from "@/modules/stores";
import { setQuestions } from "@/modules/testpaper"; // 引入 actions
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, ChevronDown,  X } from "lucide-react";

export default function TestQuestion() {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state: RootState) => state.testpaper);

  useEffect(() => {
    console.log("questions", questions);
  }, [questions]);

  // 向上移动题目
  const moveQuestionUp = (index: number) => {
    if (index === 0) return; // 已经是第一个，不能再上移

    const updated = [...questions];
    // 交换当前项与上一项
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;

    dispatch(setQuestions(updated));
  };

  // 向下移动题目
  const moveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return; // 已经是最后一个，不能再下移

    const updated = [...questions];
    // 交换当前项与下一项
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;

    dispatch(setQuestions(updated));
  };

  // 删除题目
  const removeQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    dispatch(setQuestions(updated));
  };

  // 获取题型对应的颜色
  const getTypeColor = (type: string) => {
    switch (type) {
      case "选择题":
        return "bg-blue-50 text-blue-600";
      case "计算题":
        return "bg-purple-50 text-purple-600";
      case "判断题":
        return "bg-green-50 text-green-600";
      case "填空题":
        return "bg-amber-50 text-amber-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  // 获取难度对应的颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "简单":
        return "bg-green-50 text-green-600";
      case "中等":
        return "bg-amber-50 text-amber-600";
      case "困难":
        return "bg-red-50 text-red-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="border rounded-md p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-gray-500">
          试卷题目 ({questions.length})
        </h2>
      </div>

      <Separator className="my-2" />

      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="border rounded-md p-2 hover:bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                {/* Up/Down controls */}
                <div className="flex flex-col">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    onClick={() => moveQuestionUp(index)}
                    disabled={index === 0}
                    title="上移"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                    onClick={() => moveQuestionDown(index)}
                    disabled={index === questions.length - 1}
                    title="下移"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Question content with enhanced number */}
                <div className="flex-1">
                  <div className="font-medium text-sm flex items-center">
                    <span className="inline-block min-w-[1.5rem] mr-1.5 font-semibold text-gray-700 border-r border-gray-200 pr-1.5">
                      {index + 1}.
                    </span>
                    {question.question}
                  </div>
                  <div className="text-xs mt-1.5 ml-[1.5rem] flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded-sm ${getTypeColor(
                        question.type
                      )}`}
                    >
                      {question.type}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-sm ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-1 ml-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 text-red-500"
                  onClick={() => removeQuestion(index)}
                  title="删除"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {questions.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            暂无题目，请点击右上角添加
          </div>
        )}
      </div>
    </div>
  );
}
