"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Plus,
  Save,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  GripVertical,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TestpaperDialog,
  type TestPaperDetails,
} from "@/components/dialog/TestpaperDialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable } from "@/components/dnd";

// Sample question bank data
const questionBank = [
  {
    id: "q1",
    question: "1+1=?",
    type: "选择题",
    subject: "数学",
    difficulty: "简单",
    grade: "一年级",
  },
  {
    id: "q2",
    question: "2+2=?",
    type: "选择题",
    subject: "数学",
    difficulty: "简单",
    grade: "一年级",
  },
  {
    id: "q3",
    question: "请解释牛顿第一定律",
    type: "简答题",
    subject: "物理",
    difficulty: "中等",
    grade: "初中",
  },
  {
    id: "q4",
    question: "计算以下积分: ∫x²dx",
    type: "计算题",
    subject: "数学",
    difficulty: "困难",
    grade: "高中",
  },
  {
    id: "q5",
    question: "描述光合作用的过程",
    type: "论述题",
    subject: "生物",
    difficulty: "中等",
    grade: "初中",
  },
];

const selectedQuestion: TestPaperDetails = {
  title: "期中考试",
  description: "本次考试包括选择题、判断题、简答题和论述题。",
  instructions: "请根据题目要求作答，答题时间为90分钟。",
  subject: "数学",
  questions: [
    {
      question: "111",
      type: "填空题",
      subject: "",
      difficulty: "",
      grade: "",
    },
    {
      question: "222",
      type: "选择题",
      subject: "",
      difficulty: "",
      grade: "",
    },
  ],
};

export default function CreateTestPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState(
    selectedQuestion.questions
  );
  const [infoExpanded, setInfoExpanded] = useState(true);

  // Filter questions based on search query
  const filteredQuestions = questionBank.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add question to selected list
  const addQuestion = (question: any) => {
    // Ensure each question has a unique ID
    const questionWithId = {
      ...question,
      id:
        question.id ||
        `q-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setSelectedQuestions([...selectedQuestions, questionWithId]);
  };

  // Remove question from selected list
  const removeQuestion = (index: number) => {
    const newQuestions = [...selectedQuestions];
    newQuestions.splice(index, 1);
    setSelectedQuestions(newQuestions);
  };

  // Handle drag end event
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // Dropped outside the list

    const items = Array.from(selectedQuestions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedQuestions(items);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-4">
        {/* 试卷标题和操作按钮 */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold tracking-tight">新建试卷</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Save className="mr-2 h-4 w-4" />
              保存草稿
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDialogOpen(true)}
            >
              <Eye className="mr-2 h-4 w-4" />
              预览
            </Button>
            <Button size="sm">发布试卷</Button>
          </div>
        </div>

        {/* 主要内容区域 - 左右布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* 左边布局 - 试卷信息和题库 */}
          <div className="space-y-4">
            {/* 试卷基本信息 - 可折叠布局 */}
            <div className="border rounded-md p-3">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setInfoExpanded(!infoExpanded)}
              >
                <h2 className="text-sm font-medium text-gray-500">
                  试卷基本信息
                </h2>
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
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label htmlFor="title" className="text-sm">
                      试卷标题:
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="请输入试卷标题"
                      value={selectedQuestion.title}
                      onChange={(e) => {}}
                      className="h-8 col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 items-center">
                    <Label htmlFor="subject" className="text-sm">
                      科目:
                    </Label>
                    <Select
                      value={selectedQuestion.subject}
                      onValueChange={(value) => console.log(value)}
                    >
                      <SelectTrigger id="subject" className="h-8 col-span-2">
                        <SelectValue placeholder="选择科目" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">数学</SelectItem>
                        <SelectItem value="science">科学</SelectItem>
                        <SelectItem value="history">历史</SelectItem>
                        <SelectItem value="geography">地理</SelectItem>
                        <SelectItem value="literature">文学</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                      value={selectedQuestion.timeLimit}
                      onChange={(e) => {}}
                      className="h-8 col-span-2"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 items-start">
                    <Label htmlFor="description" className="text-sm pt-1.5">
                      试卷描述:
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="简短描述试卷内容"
                      className="resize-none min-h-[50px] col-span-2"
                      value={selectedQuestion.description}
                      onChange={(e) => {}}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 items-start">
                    <Label htmlFor="instructions" className="text-sm pt-1.5">
                      考试说明:
                    </Label>
                    <Textarea
                      id="instructions"
                      name="instructions"
                      placeholder="考试注意事项"
                      className="resize-none min-h-[50px] col-span-2"
                      value={selectedQuestion.instructions}
                      onChange={(e) => {}}
                    />
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-sm text-gray-500">
                  {selectedQuestion.title} · {selectedQuestion.subject} ·{" "}
                  {selectedQuestion.timeLimit || "未设置"}分钟
                </div>
              )}
            </div>

            {/* 题库区域 */}
            <div className="border rounded-md p-3">
              <h2 className="text-sm font-medium mb-2 text-gray-500">题库</h2>

              {/* 搜索框 */}
              <div className="relative mb-3">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="搜索题目、类型或科目..."
                  className="pl-8 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* 题库列表 */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {filteredQuestions.map((question) => (
                  <div
                    key={question.id}
                    className="border rounded-md p-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => addQuestion(question)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium text-sm line-clamp-1">
                        {question.question}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          addQuestion(question);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-1 mt-1 flex-wrap">
                      <Badge variant="outline" className="text-xs">
                        {question.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {question.subject}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {question.difficulty}
                      </Badge>
                    </div>
                  </div>
                ))}

                {filteredQuestions.length === 0 && (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    没有找到匹配的题目
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 右边布局 - 已选题目列表 */}
          <div className="border rounded-md p-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-500">
                已选题目 ({selectedQuestions.length})
              </h2>
              <Button size="sm" variant="outline" className="h-7">
                <Plus className="h-3.5 w-3.5 mr-1" /> 手动添加
              </Button>
            </div>

            <Separator className="my-2" />

            {/* 已选题目列表 - 可拖动排序 */}
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="selected-questions">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto pr-1 ${
                      snapshot.isDraggingOver ? "bg-gray-50" : ""
                    }`}
                  >
                    {selectedQuestions.map((question, index) => (
                      <Draggable
                        key={question.id}
                        draggableId={question.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`border rounded-md p-2 ${
                              snapshot.isDragging
                                ? "bg-gray-100 shadow-md"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-start gap-2">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab mt-0.5 text-gray-400 hover:text-gray-600"
                                >
                                  <GripVertical className="h-4 w-4" />
                                </div>
                                <div>
                                  <div className="font-medium text-sm">
                                    {index + 1}. {question.question}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {question.type}{" "}
                                    {question.difficulty &&
                                      `· ${question.difficulty}`}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0 text-red-500"
                                  onClick={() => removeQuestion(index)}
                                >
                                  <X className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {selectedQuestions.length === 0 && (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        暂无选择的题目，请从左侧题库中添加
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </main>

      {/* 弹窗显示题目详情 */}
      <TestpaperDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={{
          ...selectedQuestion,
          questions: selectedQuestions,
        }}
      />
    </div>
  );
}
