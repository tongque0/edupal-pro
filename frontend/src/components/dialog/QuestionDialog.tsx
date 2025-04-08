"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Tag,
  BookOpen,
  BarChart3,
  User,
  Pencil,
  Plus,
  X,
  Save,
  FileQuestion,
  Lock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector, useAppDispatch } from "@/modules/stores";
import { setTraceEditing, setTraceSourceId } from "@/modules/question";
import { newQuestion, updateQuestion } from "@/api/question";
import { toast } from "sonner";
import {
  typeOptions,
  subjectOptions,
  difficultyOptions,
  gradeOptions,
} from "@/types/Options";
export interface QuestionDetail {
  id?: number;
  question: string;
  type: string;
  subject: string;
  difficulty: string;
  grade: string;
  options?: string;
  answer?: string;
  analysis?: string;
  source_id?: string;
  [key: string]: any;
}

interface QuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: QuestionDetail | null;
  mode?: "preview" | "edit" | "create";
  title?: string;
  description?: string;
  onSave?: (data: QuestionDetail) => void;
}

const DEFAULT_DATA: QuestionDetail = {
  question: "",
  type: "",
  subject: "",
  difficulty: "",
  creator: "",
  grade: "",
  options: "",
  answer: "",
  explanation: "",
};

const QuestionDialog: React.FC<QuestionDialogProps> = ({
  open,
  onOpenChange,
  data = null,
  mode = "preview",
  title,
  description,
}) => {
  const dispatch = useAppDispatch();
  const reduxTrace = useAppSelector((state) => state.question.trace);

  // 使用 internalMode 来管理组件内部状态
  const [internalMode, setInternalMode] = useState<
    "preview" | "edit" | "create"
  >(mode);
  const [formData, setFormData] = useState<QuestionDetail>(
    data ?? DEFAULT_DATA
  );
  const [showAnswer, setShowAnswer] = useState(false);
  const [editableOptions, setEditableOptions] = useState<[string, string][]>(
    []
  );
  // 在 QuestionDialog.tsx 中，修改 useEffect 如下：
  useEffect(() => {
    if (open) {
      // 打开时立即设置编辑状态
      if (mode === "edit" || mode === "create") {
        dispatch(setTraceEditing(true));
      }
      console.log(data, "data");
    } else {
      // 只在对话框关闭时重置
      dispatch(setTraceEditing(false));
    }
  }, [open, mode, dispatch]);

  useEffect(() => {
    if (mode === "create") {
      setFormData(DEFAULT_DATA);
      setInternalMode("create"); // 创建模式下使用编辑界面
    } else {
      setFormData(data ?? DEFAULT_DATA);
      setInternalMode(mode);
    }

    if (data?.options) {
      try {
        const parsed = JSON.parse(data.options);
        setEditableOptions(Object.entries(parsed));
      } catch {
        setEditableOptions([]);
      }
    } else {
      setEditableOptions([]);
    }

    setShowAnswer(false);
  }, [data, mode, open]);

  const parsedOptions = useMemo(() => {
    const isChoice = formData?.type?.includes("选择题");
    const isTrueFalse = formData?.type?.includes("判断题");
    const hasChoices = isChoice || isTrueFalse;
    const hasOptions =
      hasChoices && formData?.options && formData.options.length > 0;

    if (!hasOptions) return [];
    if (isTrueFalse)
      return [
        ["A", "正确"],
        ["B", "错误"],
      ];
    try {
      const obj = JSON.parse(formData.options!);
      return Object.entries(obj);
    } catch {
      return [];
    }
  }, [formData]);

  const getNextOptionKey = () => {
    const existing = editableOptions.map(([k]) => k);
    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i);
      if (!existing.includes(char)) return char;
    }
    return null;
  };

  const getDifficultyColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "简单":
      case "easy":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "中等":
      case "medium":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "困难":
      case "hard":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getDifficultyIcon = (level: string) => {
    switch (level?.toLowerCase()) {
      case "简单":
      case "easy":
        return <BarChart3 className="w-3 h-3 mr-1" />;
      case "中等":
      case "medium":
        return <BarChart3 className="w-3 h-3 mr-1" />;
      case "困难":
      case "hard":
        return <BarChart3 className="w-3 h-3 mr-1" />;
      default:
        return <BarChart3 className="w-3 h-3 mr-1" />;
    }
  };

  const handleChange = (key: keyof QuestionDetail, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    const optionObj = Object.fromEntries(
      editableOptions.filter(([_, v]) => v.trim())
    );

    const payload = {
      content: formData.question,
      type: formData.type,
      subject: formData.subject,
      grade: formData.grade,
      difficulty: formData.difficulty,
      options: JSON.stringify(optionObj),
      answer: formData.answer,
      explanation: formData.explanation,
      source_id: reduxTrace.sourceId,
    };

    try {
      let result;

      if (internalMode === "create") {
        result = await newQuestion({
          ...payload,
        });
      } else {
        if (!reduxTrace.sourceId) {
          toast.error("题目 ID 不存在，更新失败");
          return;
        }
        result = await updateQuestion({
          id: formData.id ?? 0,
          ...payload,
        });
      }

      if (result?.source_id) {
        dispatch(setTraceSourceId(result.source_id));
      }

      toast.success("保存成功");
      setInternalMode("preview");
    } catch (error) {
      console.error("保存失败:", error);
      toast.error("保存失败，请重试");
    }
  };

  const isEdit = internalMode === "edit" || internalMode === "create";
  const isPreviewOnly = mode === "preview"; // 外部传入的模式是否为预览模式

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-lg p-0">
        <DialogHeader className="p-6 pb-2 sticky top-0 bg-white z-10 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold flex items-center">
              <FileQuestion className="w-5 h-5 mr-2 text-primary" />
              {title ||
                (internalMode === "create"
                  ? "新建题目"
                  : internalMode === "edit"
                  ? "编辑题目"
                  : "题目详情")}
            </DialogTitle>
            {/* 只有在非预览模式下才显示编辑按钮 */}
            {!isPreviewOnly && internalMode !== "create" && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full h-8 w-8 p-0"
                      onClick={() =>
                        setInternalMode(isEdit ? "preview" : "edit")
                      }
                    >
                      <Pencil className="w-4 h-4" />
                      <span className="sr-only">
                        {isEdit ? "取消编辑" : "编辑"}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isEdit ? "取消编辑" : "编辑题目"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {/* 在预览模式下显示锁定图标 */}
            {isPreviewOnly && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="rounded-full h-8 w-8 p-0 flex items-center justify-center bg-gray-100">
                      <Lock className="w-4 h-4 text-gray-500" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>预览模式（只读）</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <DialogDescription className="text-sm text-muted-foreground">
            {description ||
              (isPreviewOnly
                ? "查看题目信息（只读模式）"
                : isEdit
                ? "编辑题目信息"
                : "查看题目信息")}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* 元数据字段 - 仅在编辑模式下显示 */}
          {isEdit && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="type">题目类型</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange("type", value)}
                >
                  <SelectTrigger>
                  <SelectValue placeholder="选择类型" />
                  </SelectTrigger>
                  <SelectContent>
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                    {option.label}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                </div>
              <div className="space-y-2">
                <Label htmlFor="subject">学科</Label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleChange("subject", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择学科" />
                  </SelectTrigger>
                  <SelectContent>
                  {subjectOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                    {option.label}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">难度</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => handleChange("difficulty", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择难度" />
                  </SelectTrigger>
                  <SelectContent>
                  {difficultyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                    {option.label}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">年级</Label>
                <Select
                  value={formData.grade || "其他"}
                  onValueChange={(value) => handleChange("grade", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择年级" />
                  </SelectTrigger>
                  <SelectContent>
                  {gradeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                    {option.label}
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* 标签 - 仅在非编辑模式下显示 */}
          {!isEdit && (
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="flex items-center bg-blue-50 text-blue-700 border-blue-200"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                {formData.subject || "未分类"}
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  "flex items-center",
                  getDifficultyColor(formData.difficulty)
                )}
              >
                {getDifficultyIcon(formData.difficulty)}
                {formData.difficulty || "未知难度"}
              </Badge>
              <Badge
                variant="outline"
                className="flex items-center bg-purple-50 text-purple-700 border-purple-200"
              >
                <Tag className="w-3 h-3 mr-1" />
                {formData.type || "未知类型"}
              </Badge>
              {formData.grade && (
                <Badge
                  variant="outline"
                  className="flex items-center bg-gray-50 text-gray-700 border-gray-200"
                >
                  <User className="w-3 h-3 mr-1" />
                  {formData.grade}
                </Badge>
              )}
            </div>
          )}

          {/* 题目内容 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 flex items-center">
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs mr-2">
                题目
              </span>
              题目内容
            </Label>
            {isEdit ? (
              <Textarea
                value={formData.question}
                onChange={(e) => handleChange("question", e.target.value)}
                className="min-h-[100px] text-base"
                placeholder="请输入题目内容..."
              />
            ) : (
              <Card>
                <CardContent className="p-4 text-gray-800 whitespace-pre-line text-base">
                  {formData.question || "暂无题目内容"}
                </CardContent>
              </Card>
            )}
          </div>

          {/* 选项 */}
          {(parsedOptions.length > 0 || isEdit) && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700 flex items-center">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs mr-2">
                  选项
                </span>
                选项列表
              </Label>
              {isEdit ? (
                <div className="space-y-2">
                  {editableOptions.map(([k, v], idx) => (
                    <div key={k} className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                        {k}
                      </div>
                      <Input
                        value={v}
                        onChange={(e) => {
                          const copy = [...editableOptions];
                          copy[idx][1] = e.target.value;
                          setEditableOptions(copy);
                        }}
                        className="flex-1"
                        placeholder={`选项 ${k} 内容...`}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-full text-gray-500 hover:text-red-500"
                        onClick={() =>
                          setEditableOptions(
                            editableOptions.filter((_, i) => i !== idx)
                          )
                        }
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      const next = getNextOptionKey();
                      if (next)
                        setEditableOptions([...editableOptions, [next, ""]]);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    添加选项
                  </Button>
                </div>
              ) : (
                <div className="grid gap-2">
                  {parsedOptions.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                        {k}
                      </div>
                      <span className="text-gray-800">{String(v)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 答案与解析 */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium text-gray-700 flex items-center">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs mr-2">
                  答案
                </span>
                答案与解析
              </Label>
              {!isEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => setShowAnswer((s) => !s)}
                >
                  {showAnswer ? (
                    <EyeOff className="w-3.5 h-3.5 mr-1" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 mr-1" />
                  )}
                  {showAnswer ? "隐藏答案" : "显示答案"}
                </Button>
              )}
            </div>

            {isEdit ? (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label className="text-xs text-gray-500">参考答案</Label>
                  <Input
                    value={formData.answer || ""}
                    placeholder="请输入参考答案..."
                    onChange={(e) => handleChange("answer", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-gray-500">解析说明</Label>
                  <Textarea
                    value={formData.explanation || ""}
                    placeholder="请输入解析说明..."
                    onChange={(e) =>
                      handleChange("explanation", e.target.value)
                    }
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            ) : showAnswer ? (
              <Card className="overflow-hidden border-primary/20">
                <CardContent className="p-0">
                  <div className="p-4  border-b border-primary/10">
                    <div className="font-medium text-primary">参考答案</div>
                    <div className="mt-1 text-gray-800">
                      {formData.answer || "无"}
                    </div>
                  </div>
                  {formData.explanation && (
                    <div className="p-4">
                      <div className="font-medium text-gray-700 mb-1">
                        解析说明
                      </div>
                      <div className="text-gray-800 whitespace-pre-line">
                        {formData.explanation}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center p-6 border border-dashed rounded-lg bg-gray-50 text-gray-400">
                <Eye className="w-4 h-4 mr-2 opacity-70" />
                <span>点击上方按钮显示答案和解析</span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 pt-2 border-t bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500 flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <span className="flex items-center">
              <span className="text-gray-400 mr-1">ID:</span>
              {formData.id || "未分配"}
            </span>
          </div>

          {isEdit ? (
            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={handleSave} className="flex-1 sm:flex-none">
                <Save className="w-4 h-4 mr-2" />
                保存
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              关闭
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionDialog;
