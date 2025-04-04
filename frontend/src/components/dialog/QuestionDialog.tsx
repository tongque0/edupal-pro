"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
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
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, BookOpen, Tag, BarChart3, User, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface QuestionDetail {
  id?: string | number
  question: string
  type: string
  subject: string
  difficulty: string
  grade?: string
  creator: string
  options?: string
  answer?: string
  analysis?: string
  [key: string]: any
}

interface DetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: QuestionDetail | null
  title?: string
  description?: string
  footerContent?: React.ReactNode
  showAnswer?: boolean
  editable?: boolean
  onSave?: (updatedData: QuestionDetail) => void
}

const QuestionDialog: React.FC<DetailsDialogProps> = ({
  open,
  onOpenChange,
  data,
  title = "题目详情",
  description = "查看题目完整信息",
  footerContent,
  showAnswer: defaultShowAnswer = false,
  editable = false,
  onSave,
}) => {
  const [showAnswer, setShowAnswer] = useState(defaultShowAnswer)
  const [animateAnswer, setAnimateAnswer] = useState(true)
  const [mode, setMode] = useState<"view" | "edit">("view")
  const [formData, setFormData] = useState<QuestionDetail | null>(data)
  const [editableOptions, setEditableOptions] = useState<[string, string][]>([])

  useEffect(() => {
    setFormData(data)
    setMode("view")

    if (data?.options) {
      try {
        const parsed = JSON.parse(data.options)
        setEditableOptions(Object.entries(parsed))
      } catch {
        setEditableOptions([])
      }
    } else {
      setEditableOptions([])
    }
  }, [data])

  if (!formData) return null

  const isChoice = formData.type?.includes("选择题")
  const isTrueFalse = formData.type?.includes("判断题")
  const hasChoices = isChoice || isTrueFalse
  const hasOptions = hasChoices && formData.options && formData.options.length > 0

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "简单":
      case "easy":
        return "text-emerald-600"
      case "中等":
      case "medium":
        return "text-amber-600"
      case "困难":
      case "hard":
        return "text-rose-600"
      default:
        return "text-gray-600"
    }
  }

  const parsedOptions = useMemo(() => {
    if (!hasOptions) return []
    if (isTrueFalse) return [["A", "正确"], ["B", "错误"]]
    try {
      const obj = JSON.parse(formData.options!)
      return Object.entries(obj)
    } catch {
      return []
    }
  }, [formData.options])

  const getNextOptionKey = () => {
    const existingKeys = editableOptions.map(([k]) => k)
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i)
      if (!existingKeys.includes(char)) return char
    }
    return null
  }

  const handleToggleAnswer = () => {
    if (showAnswer) {
      setAnimateAnswer(false)
      setTimeout(() => setShowAnswer(false), 200)
    } else {
      setShowAnswer(true)
      setTimeout(() => setAnimateAnswer(true), 50)
    }
  }

  const handleInputChange = (key: keyof QuestionDetail, value: string) => {
    setFormData((prev) => ({ ...prev!, [key]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-lg border border-gray-100 shadow-md p-6">
        <DialogHeader className="pb-2 space-y-1">
          <DialogTitle className="text-xl font-medium text-gray-800 flex justify-between items-center">
            {title}
            {editable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMode((prev) => (prev === "view" ? "edit" : "view"))}
                className="text-gray-500 hover:text-gray-800"
              >
                <Pencil className="w-4 h-4 mr-1" />
                {mode === "edit" ? "取消编辑" : "编辑"}
              </Button>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm">{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-white text-gray-700 border-gray-200">
              {formData.subject || "未分类"}
            </Badge>
            <Badge variant="outline" className={cn("bg-white border-gray-200", getDifficultyColor(formData.difficulty))}>
              {formData.difficulty || "未知难度"}
            </Badge>
            <Badge variant="outline" className="bg-white text-gray-700 border-gray-200">
              {formData.type || "未知类型"}
            </Badge>
            {formData.grade && (
              <Badge variant="outline" className="bg-white text-gray-700 border-gray-200">
                {formData.grade}
              </Badge>
            )}
          </div>

          {/* 题干 */}
          <div className="space-y-2">
            <div className="font-medium text-gray-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gray-500" />
              题目内容
            </div>
            {mode === "edit" ? (
              <Textarea
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <div className="whitespace-pre-line text-gray-800 leading-relaxed pt-1 pb-2">
                {formData.question}
              </div>
            )}

            {/* 选项 */}
            {hasChoices && (
              <div className="space-y-2 mt-4">
                <Label className="text-sm text-gray-500 block mb-1">选项:</Label>
                {mode === "edit" ? (
                  <div className="space-y-2">
                    {editableOptions.map(([key, value], idx) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="w-6 text-gray-600 font-medium">{key}.</span>
                        <Input
                          value={value}
                          onChange={(e) => {
                            const newOptions = [...editableOptions]
                            newOptions[idx][1] = e.target.value
                            setEditableOptions(newOptions)
                          }}
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            setEditableOptions(editableOptions.filter((_, i) => i !== idx))
                          }
                          className="text-gray-400 hover:text-red-500"
                        >
                          ×
                        </Button>
                      </div>
                    ))}

                    {editableOptions.length < 26 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const nextKey = getNextOptionKey()
                          if (nextKey) {
                            setEditableOptions([...editableOptions, [nextKey, ""]])
                          }
                        }}
                      >
                        添加选项
                      </Button>
                    )}
                  </div>
                ) : (
                  parsedOptions.map(([key, value]) => {
                    const isCorrect = showAnswer && formData.answer?.includes(key)
                    return (
                      <div
                        key={key}
                        className={cn(
                          "flex items-center p-3 rounded-md border border-gray-100 transition-all duration-200",
                          isCorrect ? "bg-gray-50" : "bg-white hover:bg-gray-50",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-sm",
                            isCorrect
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : "bg-gray-50 text-gray-600 border border-gray-200",
                          )}
                        >
                          {key}
                        </span>
                        <span className="text-gray-700">{String(value)}</span>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>

          {/* 答案与解析 */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-700 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-500" />
                答案与解析
              </h3>
              {mode === "view" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleToggleAnswer}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  {showAnswer ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-1.5" />
                      隐藏答案
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1.5" />
                      显示答案
                    </>
                  )}
                </Button>
              )}
            </div>

            {mode === "edit" ? (
              <>
                <div>
                  <Label className="text-sm text-gray-500 block mb-1.5">参考答案:</Label>
                  <Input
                    value={formData.answer || ""}
                    onChange={(e) => handleInputChange("answer", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm text-gray-500 block mb-1.5">解析说明:</Label>
                  <Textarea
                    value={formData.analysis || ""}
                    onChange={(e) => handleInputChange("analysis", e.target.value)}
                  />
                </div>
              </>
            ) : showAnswer ? (
              <div className={cn("space-y-4 transition-all", animateAnswer ? "opacity-100" : "opacity-0")}>
                <div>
                  <Label className="text-sm text-gray-500 block mb-1.5">参考答案:</Label>
                  <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                    <div className="text-gray-800">
                      {formData.answer || <span className="text-gray-400 italic">暂无答案</span>}
                    </div>
                  </div>
                </div>
                {formData.analysis && (
                  <div>
                    <Label className="text-sm text-gray-500 block mb-1.5">解析说明:</Label>
                    <div className="p-3 bg-gray-50 rounded-md border border-gray-100">
                      <div className="text-gray-800 whitespace-pre-line leading-relaxed">{formData.analysis}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-20 flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-200 rounded-md bg-gray-50/50">
                <EyeOff className="w-4 h-4 mb-1.5 opacity-70" />
                <span className="text-sm">答案已隐藏，点击按钮查看</span>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-gray-100 my-1" />

        <DialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
          <div className="text-xs text-gray-400 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              题目ID: {formData.id || "未分配"}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              创建者: {formData.creator || "未知"}
            </span>
          </div>
          {mode === "edit" ? (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const optionsObj: Record<string, string> = {}
                  editableOptions.forEach(([k, v]) => {
                    if (v.trim()) optionsObj[k] = v.trim()
                  })
                  const updatedForm = {
                    ...formData,
                    options: JSON.stringify(optionsObj),
                  }
                  onSave?.(updatedForm)
                  setMode("view")
                }}
              >
                保存
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(data)
                  setMode("view")
                }}
              >
                取消
              </Button>
            </div>
          ) : (
            footerContent || (
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                关闭
              </Button>
            )
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default QuestionDialog
