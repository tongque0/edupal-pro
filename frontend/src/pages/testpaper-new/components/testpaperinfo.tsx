import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/modules/stores";
import { RootState } from "@/modules/stores";
import {
  setTitle,
  setGrade,
  setSubject,
  setTimeLimit,
  setDescription,
  setInstructions,
} from "@/modules/testpaper"; // 引入 actions
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjectOptions, gradeOptions } from "@/types/Options";
export default function TestPaperInfo() {
  const dispatch = useAppDispatch();
  const { title, subject, timeLimit, description, instructions, grade } =
    useAppSelector((state: RootState) => state.testpaper);

  // 控制显示状态
  const [infoExpanded, setInfoExpanded] = useState(true);

  // 处理输入框变化
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitle(e.target.value));
  };

  const handleGradeChange = (value: string) => {
    dispatch(setGrade(value));
  };
  const handleSubjectChange = (value: string) => {
    dispatch(setSubject(value));
  };

  const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTimeLimit(Number(e.target.value)));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setDescription(e.target.value));
  };

  const handleInstructionsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch(setInstructions(e.target.value));
  };

  return (
    <div className="border rounded-md p-3">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setInfoExpanded(!infoExpanded)}
      >
        <h2 className="text-sm font-medium text-gray-500">试卷基本信息</h2>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {infoExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      {infoExpanded ? (
        <div className="space-y-2 mt-2">
          {/* 科目与年级 */}
          <div className="grid grid-cols-3 gap-2 items-center">
            {/* 科目 */}
            <div className="flex items-center gap-0">
              <Select value={subject} onValueChange={handleSubjectChange}>
                <SelectTrigger id="subject" className="h-8 w-32">
                  <SelectValue placeholder="选择科目" />
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

            {/* 年级 */}
            <div className="flex items-center gap-0">

              <Select value={grade} onValueChange={handleGradeChange}>
                <SelectTrigger id="grade" className="h-8 w-32">
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

          {/* 试卷标题 */}
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label htmlFor="title" className="text-sm">
              试卷标题:
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="请输入试卷标题"
              value={title}
              onChange={handleTitleChange}
              className="h-8 col-span-2"
            />
          </div>

          {/* 时间限制 */}
          <div className="grid grid-cols-3 gap-2 items-center">
            <Label htmlFor="timeLimit" className="text-sm">
              时间限制:
            </Label>
            <Input
              id="timeLimit"
              name="timeLimit"
              type="number"
              min="1"
              placeholder="分钟"
              value={timeLimit || ""}
              onChange={handleTimeLimitChange}
              className="h-8 col-span-2"
            />
          </div>

          {/* 试卷描述 */}
          <div className="grid grid-cols-3 gap-2 items-start">
            <Label htmlFor="description" className="text-sm pt-1.5">
              试卷描述:
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="简短描述试卷内容"
              className="resize-none min-h-[50px] col-span-2"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* 考试说明 */}
          <div className="grid grid-cols-3 gap-2 items-start">
            <Label htmlFor="instructions" className="text-sm pt-1.5">
              考试说明:
            </Label>
            <Textarea
              id="instructions"
              name="instructions"
              placeholder="考试注意事项"
              className="resize-none min-h-[50px] col-span-2"
              value={instructions}
              onChange={handleInstructionsChange}
            />
          </div>
        </div>
      ) : (
        <div className="mt-2 text-sm text-gray-500">
          {title} · {subject} · {timeLimit || "未设置"}分钟
        </div>
      )}
    </div>
  );
}
