"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, BookOpen, Tag, BarChart3, CheckCircle2, GraduationCap, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// 定义问题类型接口
export interface QuestionDetail {
  id?: string | number
  question: string
  type: string
  subject: string
  difficulty: string
  grade?: string
  creator: string
  options?: string // 选项
  answer?: string // 答案
  analysis?: string // 解析
  [key: string]: any // 允许额外的字段
}

interface DetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: QuestionDetail | null
  title?: string
  description?: string
  footerContent?: React.ReactNode
  showAnswer?: boolean // 是否默认显示答案
}

const QuestionDialog: React.FC<DetailsDialogProps> = ({
  open,
  onOpenChange,
  data,
  title = "题目详情",
  description = "查看题目完整信息",
  footerContent,
  showAnswer: defaultShowAnswer = false,
}) => {
  const [showAnswer, setShowAnswer] = useState(defaultShowAnswer)
  const [animateAnswer, setAnimateAnswer] = useState(false)

  if (!data) return null

  // 判断题目类型
  const isMultipleChoice = data.type?.includes("选择题")
  const isTrueFalse = data.type?.includes("判断题")
  const hasChoices = isMultipleChoice || isTrueFalse

  // 判断是否有选项
  const hasOptions = hasChoices && data.options && data.options.length > 0

  // 获取难度对应的颜色
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "简单":
      case "easy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
      case "中等":
      case "medium":
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
      case "困难":
      case "hard":
        return "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
    }
  }

  // 获取学科对应的颜色
  const getSubjectColor = (subject: string) => {
    const subjectMap: Record<string, string> = {
      数学: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
      英语: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      物理: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
      化学: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100",
      生物: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
      历史: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
      地理: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
      政治: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100",
    }

    return subjectMap[subject] || "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
  }

  // 处理选项数据
  const parseOptions = () => {
    if (!hasOptions) return []

    if (isTrueFalse) {
      return ["正确", "错误"]
    }

    return (data.options || "").split(",").map((option) => option.trim())
  }

  const options = parseOptions()

  // 处理答案显示/隐藏的动画
  const handleToggleAnswer = () => {
    if (showAnswer) {
      setAnimateAnswer(false)
      setTimeout(() => setShowAnswer(false), 300)
    } else {
      setShowAnswer(true)
      setTimeout(() => setAnimateAnswer(true), 50)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-xl border-0 shadow-lg">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            {title}
          </DialogTitle>
          <DialogDescription className="text-slate-500">{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 标签区域 */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={cn("transition-all", getSubjectColor(data.subject))}>
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              {data.subject || "未分类"}
            </Badge>
            <Badge variant="outline" className={cn("transition-all", getDifficultyColor(data.difficulty))}>
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
              {data.difficulty || "未知难度"}
            </Badge>
            <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100">
              {data.type || "未知类型"}
            </Badge>
            {data.grade && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100">
                <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                {data.grade}
              </Badge>
            )}
          </div>

          {/* 题目内容区 */}
          <Card className="p-5 shadow-sm border border-slate-200 bg-white rounded-xl hover:shadow-md transition-shadow duration-300">
            <div className="font-medium text-lg mb-4 flex items-center text-slate-800">
              <BookOpen className="w-5 h-5 mr-2 text-slate-600" />
              题目内容
            </div>
            <div className="whitespace-pre-line text-base leading-relaxed text-slate-700">{data.question}</div>

            {/* 选项区域 - 仅在选择题或判断题时显示 */}
            {hasOptions && (
              <div className="mt-5 grid gap-2.5">
                {options.map((option, index) => {
                  const isCorrect = showAnswer && data.answer?.includes(String.fromCharCode(65 + index))
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex items-center p-3 rounded-lg border transition-all duration-200",
                        isCorrect ? "bg-emerald-50 border-emerald-200" : "border-slate-200 hover:bg-slate-50",
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center justify-center w-7 h-7 rounded-full mr-3 font-medium text-sm",
                          isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700",
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-slate-700">{option}</span>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 ml-auto text-emerald-500" />}
                    </div>
                  )
                })}
              </div>
            )}
          </Card>

          {/* 答案和解析区 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center text-slate-800">
                <BarChart3 className="w-5 h-5 mr-2 text-slate-600" />
                答案与解析
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleAnswer}
                className={cn(
                  "flex items-center transition-all duration-200",
                  showAnswer
                    ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
                )}
              >
                {showAnswer ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-1.5" /> 隐藏答案
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-1.5" /> 显示答案
                  </>
                )}
              </Button>
            </div>

            {showAnswer ? (
              <div
                className={cn(
                  "space-y-4 transition-all duration-300 ease-in-out",
                  animateAnswer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
              >
                <div>
                  <Label className="text-sm font-medium text-slate-500 block mb-2">参考答案:</Label>
                  <Card className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-slate-700 font-medium">
                      {data.answer || <span className="text-slate-400 italic">暂无答案</span>}
                    </div>
                  </Card>
                </div>

                {data.analysis && (
                  <div>
                    <Label className="text-sm font-medium text-slate-500 block mb-2">解析说明:</Label>
                    <Card className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="text-slate-700 whitespace-pre-line leading-relaxed">{data.analysis}</div>
                    </Card>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-24 flex flex-col items-center justify-center text-slate-500 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors duration-200">
                <EyeOff className="w-5 h-5 mb-2 text-slate-400" />
                答案已隐藏，点击按钮查看
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-slate-200" />

        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          <div className="text-xs text-slate-500 flex items-center">
            <div className="flex items-center mr-3">
              <Tag className="w-3.5 h-3.5 mr-1.5" />
              题目ID: {data.id || "未分配"}
            </div>
            <div className="flex items-center">
              <User className="w-3.5 h-3.5 mr-1.5" />
              创建者: {data.creator || "未知"}
            </div>
          </div>
          {footerContent || (
            <Button
              onClick={() => onOpenChange(false)}
              className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 transition-all duration-300"
            >
              关闭
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QuestionDialog

