"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Loader2, Plus, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // AI 生成选项的状态
  const [aiOptions, setAiOptions] = useState({
    subject: "geography",
    topic: "",
    content: "",
    difficulty: "mixed",
    questionTypes: {
      multipleChoice: { enabled: true, count: 2 },
      trueFalse: { enabled: true, count: 1 },
      shortAnswer: { enabled: true, count: 1 },
      essay: { enabled: false, count: 0 },
    },
    creativity: 50,
    includeAnswers: true,
  });

  // 手动问题创建的状态
  const [manualQuestion, setManualQuestion] = useState({
    question: "",
    type: "multipleChoice",
    difficulty: "medium",
    answer: "",
    options: ["", "", "", ""],
    explanation: "",
  });

  const handleAIOptionChange = (category, value) => {
    setAiOptions({
      ...aiOptions,
      [category]: value,
    });
  };

  const handleQuestionTypeToggle = (type) => {
    setAiOptions({
      ...aiOptions,
      questionTypes: {
        ...aiOptions.questionTypes,
        [type]: {
          ...aiOptions.questionTypes[type],
          enabled: !aiOptions.questionTypes[type].enabled,
        },
      },
    });
  };

  const handleQuestionTypeCountChange = (type, count) => {
    setAiOptions({
      ...aiOptions,
      questionTypes: {
        ...aiOptions.questionTypes,
        [type]: {
          ...aiOptions.questionTypes[type],
          count: Number.parseInt(count),
        },
      },
    });
  };

  const handleManualQuestionChange = (field, value) => {
    setManualQuestion({
      ...manualQuestion,
      [field]: value,
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...manualQuestion.options];
    newOptions[index] = value;
    setManualQuestion({
      ...manualQuestion,
      options: newOptions,
    });
  };

  const handleEditQuestionChange = (field, value) => {
    setEditingQuestion({
      ...editingQuestion,
      [field]: value,
    });
  };

  const handleEditOptionChange = (index, value) => {
    const newOptions = [...editingQuestion.options];
    newOptions[index] = value;
    setEditingQuestion({
      ...editingQuestion,
      options: newOptions,
    });
  };

  const saveEditedQuestion = () => {
    const updatedQuestions = generatedQuestions.map((q) =>
      q.id === editingQuestion.id ? editingQuestion : q
    );
    setGeneratedQuestions(updatedQuestions);
    setEditingQuestion(null);
  };

  const addManualQuestion = () => {
    // 验证问题
    if (!manualQuestion.question.trim()) {
      alert("请输入问题");
      return;
    }

    if (
      manualQuestion.type === "multipleChoice" &&
      (!manualQuestion.options.some((opt) => opt.trim()) ||
        !manualQuestion.answer.trim())
    ) {
      alert("请至少添加一个选项并选择答案");
      return;
    }

    if (
      (manualQuestion.type === "shortAnswer" ||
        manualQuestion.type === "essay") &&
      !manualQuestion.answer.trim()
    ) {
      alert("请提供答案");
      return;
    }

    if (manualQuestion.type === "trueFalse" && !manualQuestion.answer.trim()) {
      alert("请选择正确答案（是/否）");
      return;
    }

    // 创建新问题对象
    const newQuestion = {
      id: Date.now().toString(),
      question: manualQuestion.question,
      type:
        manualQuestion.type === "multipleChoice"
          ? "多项选择"
          : manualQuestion.type === "trueFalse"
          ? "是/否"
          : manualQuestion.type === "shortAnswer"
          ? "简答"
          : "作文",
      options:
        manualQuestion.type === "multipleChoice"
          ? manualQuestion.options.filter((opt) => opt.trim())
          : manualQuestion.type === "trueFalse"
          ? ["是", "否"]
          : [],
      answer: manualQuestion.answer,
      difficulty:
        manualQuestion.difficulty.charAt(0).toUpperCase() +
        manualQuestion.difficulty.slice(1),
      explanation: manualQuestion.explanation,
      isManual: true,
    };

    // 添加到生成的问题列表
    setGeneratedQuestions([...generatedQuestions, newQuestion]);

    // 重置表单
    setManualQuestion({
      question: "",
      type: "multipleChoice",
      difficulty: "medium",
      answer: "",
      options: ["", "", "", ""],
      explanation: "",
    });
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    // 计算要生成的问题总数
    const totalQuestions = Object.values(aiOptions.questionTypes).reduce(
      (sum, type) => sum + (type.enabled ? type.count : 0),
      0
    );

    if (totalQuestions === 0) {
      alert("请至少选择一种问题类型和数量");
      setIsGenerating(false);
      return;
    }

    // 模拟 API 调用来生成问题
    setTimeout(() => {
      const newQuestions = [];

      // 生成多项选择问题
      if (aiOptions.questionTypes.multipleChoice.enabled) {
        for (let i = 0; i < aiOptions.questionTypes.multipleChoice.count; i++) {
          newQuestions.push({
            id: `mc-${Date.now()}-${i}`,
            question: `什么是${
              ["法国", "德国", "日本", "巴西", "澳大利亚"][
                Math.floor(Math.random() * 5)
              ]
            }的首都？`,
            type: "多项选择",
            options: ["巴黎", "伦敦", "柏林", "东京", "马德里"]
              .sort(() => Math.random() - 0.5)
              .slice(0, 4),
            answer: "巴黎",
            difficulty: ["简单", "中等", "困难"][Math.floor(Math.random() * 3)],
            explanation: "首都城市是政府的正式所在地。",
          });
        }
      }

      // 生成是/否问题
      if (aiOptions.questionTypes.trueFalse.enabled) {
        for (let i = 0; i < aiOptions.questionTypes.trueFalse.count; i++) {
          newQuestions.push({
            id: `tf-${Date.now()}-${i}`,
            question: "地球围绕太阳转动。",
            type: "是/否",
            options: ["是", "否"],
            answer: "是",
            difficulty: ["简单", "中等", "困难"][Math.floor(Math.random() * 3)],
            explanation: "这是我们太阳系的基本事实。",
          });
        }
      }

      // 生成简答问题
      if (aiOptions.questionTypes.shortAnswer.enabled) {
        for (let i = 0; i < aiOptions.questionTypes.shortAnswer.count; i++) {
          newQuestions.push({
            id: `sa-${Date.now()}-${i}`,
            question: "物质的三种状态是什么？",
            type: "简答",
            answer: "固态、液态、气态",
            difficulty: ["简单", "中等", "困难"][Math.floor(Math.random() * 3)],
            explanation: "在正常条件下，物质存在三种常见的状态。",
          });
        }
      }

      // 生成作文问题
      if (aiOptions.questionTypes.essay.enabled) {
        for (let i = 0; i < aiOptions.questionTypes.essay.count; i++) {
          newQuestions.push({
            id: `es-${Date.now()}-${i}`,
            question: "解释光合作用的过程及其对地球生命的重要性。",
            type: "作文",
            answer:
              "光合作用是绿色植物和一些其他生物在阳光的帮助下，通过叶绿素合成食物的过程。",
            difficulty: ["简单", "中等", "困难"][Math.floor(Math.random() * 3)],
            explanation: "这是维持大多数生态系统的基本生物过程。",
          });
        }
      }

      setGeneratedQuestions([...generatedQuestions, ...newQuestions]);
      setIsGenerating(false);
    }, 2000);
  };

  const deleteQuestion = (id) => {
    setGeneratedQuestions(generatedQuestions.filter((q) => q.id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs defaultValue="ai" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ai">AI 生成</TabsTrigger>
                <TabsTrigger value="manual">手动创建</TabsTrigger>
              </TabsList>

              {/* AI 生成标签内容 */}
              <TabsContent value="ai">
                <Card>
                  <CardHeader>
                    <CardTitle>AI 问题生成器</CardTitle>
                    <CardDescription>
                      配置 AI 根据您的要求生成问题
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">学科</Label>
                      <Select
                        value={aiOptions.subject}
                        onValueChange={(value) =>
                          handleAIOptionChange("subject", value)
                        }
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="选择学科" />
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

                    <div className="space-y-2">
                      <Label htmlFor="topic">主题</Label>
                      <Input
                        id="topic"
                        placeholder="例如：世界首都、河流、山脉"
                        value={aiOptions.topic}
                        onChange={(e) =>
                          handleAIOptionChange("topic", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">内容或背景（可选）</Label>
                      <Textarea
                        id="content"
                        placeholder="粘贴文本或描述您想要的问题内容"
                        className="min-h-[100px]"
                        value={aiOptions.content}
                        onChange={(e) =>
                          handleAIOptionChange("content", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">难度</Label>
                      <Select
                        value={aiOptions.difficulty}
                        onValueChange={(value) =>
                          handleAIOptionChange("difficulty", value)
                        }
                      >
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="选择难度" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">简单</SelectItem>
                          <SelectItem value="medium">中等</SelectItem>
                          <SelectItem value="hard">困难</SelectItem>
                          <SelectItem value="mixed">混合</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <Label>问题类型和数量</Label>
                      <div className="space-y-3 border rounded-md p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="multiple-choice"
                              checked={
                                aiOptions.questionTypes.multipleChoice.enabled
                              }
                              onCheckedChange={() =>
                                handleQuestionTypeToggle("multipleChoice")
                              }
                            />
                            <Label
                              htmlFor="multiple-choice"
                              className="font-normal"
                            >
                              多项选择
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="mc-count" className="text-sm">
                              数量：
                            </Label>
                            <Input
                              id="mc-count"
                              type="number"
                              min="0"
                              max="10"
                              className="w-16 h-8"
                              value={
                                aiOptions.questionTypes.multipleChoice.count
                              }
                              onChange={(e) =>
                                handleQuestionTypeCountChange(
                                  "multipleChoice",
                                  e.target.value
                                )
                              }
                              disabled={
                                !aiOptions.questionTypes.multipleChoice.enabled
                              }
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="true-false"
                              checked={
                                aiOptions.questionTypes.trueFalse.enabled
                              }
                              onCheckedChange={() =>
                                handleQuestionTypeToggle("trueFalse")
                              }
                            />
                            <Label htmlFor="true-false" className="font-normal">
                              是/否
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="tf-count" className="text-sm">
                              数量：
                            </Label>
                            <Input
                              id="tf-count"
                              type="number"
                              min="0"
                              max="10"
                              className="w-16 h-8"
                              value={aiOptions.questionTypes.trueFalse.count}
                              onChange={(e) =>
                                handleQuestionTypeCountChange(
                                  "trueFalse",
                                  e.target.value
                                )
                              }
                              disabled={
                                !aiOptions.questionTypes.trueFalse.enabled
                              }
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="short-answer"
                              checked={
                                aiOptions.questionTypes.shortAnswer.enabled
                              }
                              onCheckedChange={() =>
                                handleQuestionTypeToggle("shortAnswer")
                              }
                            />
                            <Label
                              htmlFor="short-answer"
                              className="font-normal"
                            >
                              简答
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="sa-count" className="text-sm">
                              数量：
                            </Label>
                            <Input
                              id="sa-count"
                              type="number"
                              min="0"
                              max="10"
                              className="w-16 h-8"
                              value={aiOptions.questionTypes.shortAnswer.count}
                              onChange={(e) =>
                                handleQuestionTypeCountChange(
                                  "shortAnswer",
                                  e.target.value
                                )
                              }
                              disabled={
                                !aiOptions.questionTypes.shortAnswer.enabled
                              }
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="essay"
                              checked={aiOptions.questionTypes.essay.enabled}
                              onCheckedChange={() =>
                                handleQuestionTypeToggle("essay")
                              }
                            />
                            <Label htmlFor="essay" className="font-normal">
                              作文
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor="essay-count" className="text-sm">
                              数量：
                            </Label>
                            <Input
                              id="essay-count"
                              type="number"
                              min="0"
                              max="5"
                              className="w-16 h-8"
                              value={aiOptions.questionTypes.essay.count}
                              onChange={(e) =>
                                handleQuestionTypeCountChange(
                                  "essay",
                                  e.target.value
                                )
                              }
                              disabled={!aiOptions.questionTypes.essay.enabled}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="creativity">AI 创造力</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          id="creativity"
                          value={[aiOptions.creativity]}
                          max={100}
                          step={1}
                          className="flex-1"
                          onValueChange={(value) =>
                            handleAIOptionChange("creativity", value[0])
                          }
                        />
                        <span className="w-12 text-center">
                          {aiOptions.creativity}%
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="include-answers"
                        checked={aiOptions.includeAnswers}
                        onCheckedChange={(checked) =>
                          handleAIOptionChange("includeAnswers", checked)
                        }
                      />
                      <Label htmlFor="include-answers">包含答案</Label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          正在生成...
                        </>
                      ) : (
                        "生成问题"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* 手动创建标签内容 */}
              <TabsContent value="manual">
                <Card>
                  <CardHeader>
                    <CardTitle>手动创建问题</CardTitle>
                    <CardDescription>创建您自己的自定义问题</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="question-text">问题</Label>
                      <Textarea
                        id="question-text"
                        placeholder="输入您的问题"
                        className="min-h-[80px]"
                        value={manualQuestion.question}
                        onChange={(e) =>
                          handleManualQuestionChange("question", e.target.value)
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="question-type">问题类型</Label>
                      <Select
                        value={manualQuestion.type}
                        onValueChange={(value) =>
                          handleManualQuestionChange("type", value)
                        }
                      >
                        <SelectTrigger id="question-type">
                          <SelectValue placeholder="选择问题类型" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multipleChoice">
                            多项选择
                          </SelectItem>
                          <SelectItem value="trueFalse">是/否</SelectItem>
                          <SelectItem value="shortAnswer">简答</SelectItem>
                          <SelectItem value="essay">作文</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="question-difficulty">难度</Label>
                      <Select
                        value={manualQuestion.difficulty}
                        onValueChange={(value) =>
                          handleManualQuestionChange("difficulty", value)
                        }
                      >
                        <SelectTrigger id="question-difficulty">
                          <SelectValue placeholder="选择难度" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">简单</SelectItem>
                          <SelectItem value="medium">中等</SelectItem>
                          <SelectItem value="hard">困难</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {manualQuestion.type === "multipleChoice" && (
                      <div className="space-y-3">
                        <Label>选项</Label>
                        {manualQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              placeholder={`选项 ${index + 1}`}
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                              }
                            />
                            <div className="flex items-center h-10 px-3 rounded-md border">
                              <input
                                type="radio"
                                id={`option-${index}`}
                                name="correct-option"
                                className="mr-2"
                                checked={manualQuestion.answer === option}
                                onChange={() =>
                                  handleManualQuestionChange("answer", option)
                                }
                              />
                              <Label
                                htmlFor={`option-${index}`}
                                className="text-sm cursor-pointer"
                              >
                                正确
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {manualQuestion.type === "trueFalse" && (
                      <div className="space-y-2">
                        <Label>正确答案</Label>
                        <RadioGroup
                          value={manualQuestion.answer}
                          onValueChange={(value) =>
                            handleManualQuestionChange("answer", value)
                          }
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="True" id="true" />
                            <Label htmlFor="true">是</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="False" id="false" />
                            <Label htmlFor="false">否</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}

                    {(manualQuestion.type === "shortAnswer" ||
                      manualQuestion.type === "essay") && (
                      <div className="space-y-2">
                        <Label htmlFor="answer">答案</Label>
                        <Textarea
                          id="answer"
                          placeholder="输入答案"
                          className={`min-h-${
                            manualQuestion.type === "essay" ? "100" : "60"
                          }px`}
                          value={manualQuestion.answer}
                          onChange={(e) =>
                            handleManualQuestionChange("answer", e.target.value)
                          }
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="explanation">解释（可选）</Label>
                      <Textarea
                        id="explanation"
                        placeholder="提供答案的解释"
                        className="min-h-[60px]"
                        value={manualQuestion.explanation}
                        onChange={(e) =>
                          handleManualQuestionChange(
                            "explanation",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={addManualQuestion}>
                      <Plus className="mr-2 h-4 w-4" />
                      添加问题
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>生成的问题</CardTitle>
                <CardDescription>
                  {generatedQuestions.length > 0
                    ? `${generatedQuestions.length} 个问题已生成`
                    : "生成后问题将显示在这里"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedQuestions.length === 0 && !isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Brain className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      使用 AI 生成问题或手动创建问题
                    </p>
                  </div>
                ) : isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">
                      我们的 AI 正在根据您的标准生成问题...
                    </p>
                  </div>
                ) : (
                  generatedQuestions.map((q) => (
                    <Card key={q.id} className="border border-muted">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">
                            {q.question}
                          </CardTitle>
                          <div className="flex items-center gap-1">
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/10 dark:text-blue-400 dark:ring-blue-400/30">
                              {q.type}
                            </span>
                            {q.isManual && (
                              <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-purple-900/10 dark:text-purple-400 dark:ring-purple-400/30">
                                手动
                              </span>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        {q.type === "多项选择" && (
                          <div className="space-y-2">
                            {q.options.map((option, j) => (
                              <div
                                key={j}
                                className="flex items-center space-x-2"
                              >
                                <div
                                  className={`h-4 w-4 rounded-full border ${
                                    option === q.answer
                                      ? "bg-primary border-primary"
                                      : "border-muted-foreground"
                                  }`}
                                />
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {q.type === "是/否" && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div
                                className={`h-4 w-4 rounded-full border ${
                                  q.answer === "是"
                                    ? "bg-primary border-primary"
                                    : "border-muted-foreground"
                                }`}
                              />
                              <span>是</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`h-4 w-4 rounded-full border ${
                                  q.answer === "否"
                                    ? "bg-primary border-primary"
                                    : "border-muted-foreground"
                                }`}
                              />
                              <span>否</span>
                            </div>
                          </div>
                        )}
                        {(q.type === "简答" || q.type === "作文") && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">答案：</p>
                            <p className="text-sm text-muted-foreground">
                              {q.answer}
                            </p>
                          </div>
                        )}

                        {q.explanation && (
                          <div className="mt-2">
                            <p className="text-sm font-medium">解释：</p>
                            <p className="text-sm text-muted-foreground">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                编辑
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>编辑问题</DialogTitle>
                                <DialogDescription>
                                  修改问题及其详细信息
                                </DialogDescription>
                              </DialogHeader>
                              {editingQuestion && (
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="edit-question">问题</Label>
                                    <Textarea
                                      id="edit-question"
                                      value={editingQuestion.question}
                                      onChange={(e) =>
                                        handleEditQuestionChange(
                                          "question",
                                          e.target.value
                                        )
                                      }
                                      className="min-h-[80px]"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-type">
                                        问题类型
                                      </Label>
                                      <Select
                                        value={
                                          editingQuestion.type === "多项选择"
                                            ? "multipleChoice"
                                            : editingQuestion.type === "是/否"
                                            ? "trueFalse"
                                            : editingQuestion.type === "简答"
                                            ? "shortAnswer"
                                            : "essay"
                                        }
                                        onValueChange={(value) => {
                                          const typeMap = {
                                            multipleChoice: "多项选择",
                                            trueFalse: "是/否",
                                            shortAnswer: "简答",
                                            essay: "作文",
                                          };
                                          handleEditQuestionChange(
                                            "type",
                                            typeMap[value]
                                          );
                                        }}
                                      >
                                        <SelectTrigger id="edit-type">
                                          <SelectValue placeholder="选择类型" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="multipleChoice">
                                            多项选择
                                          </SelectItem>
                                          <SelectItem value="trueFalse">
                                            是/否
                                          </SelectItem>
                                          <SelectItem value="shortAnswer">
                                            简答
                                          </SelectItem>
                                          <SelectItem value="essay">
                                            作文
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor="edit-difficulty">
                                        难度
                                      </Label>
                                      <Select
                                        value={editingQuestion.difficulty.toLowerCase()}
                                        onValueChange={(value) =>
                                          handleEditQuestionChange(
                                            "difficulty",
                                            value.charAt(0).toUpperCase() +
                                              value.slice(1)
                                          )
                                        }
                                      >
                                        <SelectTrigger id="edit-difficulty">
                                          <SelectValue placeholder="选择难度" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="easy">
                                            简单
                                          </SelectItem>
                                          <SelectItem value="medium">
                                            中等
                                          </SelectItem>
                                          <SelectItem value="hard">
                                            困难
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>

                                  {editingQuestion.type === "多项选择" && (
                                    <div className="space-y-3">
                                      <Label>选项</Label>
                                      {editingQuestion.options.map(
                                        (option, index) => (
                                          <div
                                            key={index}
                                            className="flex items-center gap-2"
                                          >
                                            <Input
                                              value={option}
                                              onChange={(e) =>
                                                handleEditOptionChange(
                                                  index,
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <div className="flex items-center h-10 px-3 rounded-md border">
                                              <input
                                                type="radio"
                                                id={`edit-option-${index}`}
                                                name="edit-correct-option"
                                                className="mr-2"
                                                checked={
                                                  editingQuestion.answer ===
                                                  option
                                                }
                                                onChange={() =>
                                                  handleEditQuestionChange(
                                                    "answer",
                                                    option
                                                  )
                                                }
                                              />
                                              <Label
                                                htmlFor={`edit-option-${index}`}
                                                className="text-sm cursor-pointer"
                                              >
                                                正确
                                              </Label>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          setEditingQuestion({
                                            ...editingQuestion,
                                            options: [
                                              ...editingQuestion.options,
                                              "",
                                            ],
                                          })
                                        }
                                      >
                                        <Plus className="h-4 w-4 mr-1" />
                                        添加选项
                                      </Button>
                                    </div>
                                  )}

                                  {editingQuestion.type === "是/否" && (
                                    <div className="space-y-2">
                                      <Label>正确答案</Label>
                                      <RadioGroup
                                        value={editingQuestion.answer}
                                        onValueChange={(value) =>
                                          handleEditQuestionChange(
                                            "answer",
                                            value
                                          )
                                        }
                                        className="flex space-x-4"
                                      >
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="True"
                                            id="edit-true"
                                          />
                                          <Label htmlFor="edit-true">是</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <RadioGroupItem
                                            value="False"
                                            id="edit-false"
                                          />
                                          <Label htmlFor="edit-false">否</Label>
                                        </div>
                                      </RadioGroup>
                                    </div>
                                  )}

                                  {(editingQuestion.type === "简答" ||
                                    editingQuestion.type === "作文") && (
                                    <div className="space-y-2">
                                      <Label htmlFor="edit-answer">答案</Label>
                                      <Textarea
                                        id="edit-answer"
                                        value={editingQuestion.answer}
                                        onChange={(e) =>
                                          handleEditQuestionChange(
                                            "answer",
                                            e.target.value
                                          )
                                        }
                                        className={`min-h-${
                                          editingQuestion.type === "作文"
                                            ? "100"
                                            : "60"
                                        }px`}
                                      />
                                    </div>
                                  )}

                                  <div className="space-y-2">
                                    <Label htmlFor="edit-explanation">
                                      解释（可选）
                                    </Label>
                                    <Textarea
                                      id="edit-explanation"
                                      value={editingQuestion.explanation || ""}
                                      onChange={(e) =>
                                        handleEditQuestionChange(
                                          "explanation",
                                          e.target.value
                                        )
                                      }
                                      className="min-h-[60px]"
                                      placeholder="提供答案的解释"
                                    />
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setEditingQuestion(null)}
                                >
                                  取消
                                </Button>
                                <Button onClick={saveEditedQuestion}>
                                  保存更改
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteQuestion(q.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            删除
                          </Button>
                        </div>
                        <Button variant="outline" size="sm">
                          保存到题库
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </CardContent>
              {generatedQuestions.length > 0 && (
                <CardFooter className="flex justify-between">
                  <Button variant="outline">重新生成</Button>
                  <Button>保存所有到题库</Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
