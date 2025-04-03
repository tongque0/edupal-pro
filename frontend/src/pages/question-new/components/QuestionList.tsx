import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { Brain, Loader2, Edit, Plus, Trash2 } from "lucide-react";

export default function QuestionList() {
  return (
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
                  <CardTitle className="text-base">{q.question}</CardTitle>
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
                      <div key={j} className="flex items-center space-x-2">
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
                    <p className="text-sm text-muted-foreground">{q.answer}</p>
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
                              <Label htmlFor="edit-type">问题类型</Label>
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
                                  <SelectItem value="essay">作文</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="edit-difficulty">难度</Label>
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
                                  <SelectItem value="easy">简单</SelectItem>
                                  <SelectItem value="medium">中等</SelectItem>
                                  <SelectItem value="hard">困难</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          {editingQuestion.type === "多项选择" && (
                            <div className="space-y-3">
                              <Label>选项</Label>
                              {editingQuestion.options.map((option, index) => (
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
                                        editingQuestion.answer === option
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
                              ))}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setEditingQuestion({
                                    ...editingQuestion,
                                    options: [...editingQuestion.options, ""],
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
                                  handleEditQuestionChange("answer", value)
                                }
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="True" id="edit-true" />
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
                                  editingQuestion.type === "作文" ? "100" : "60"
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
                        <Button onClick={saveEditedQuestion}>保存更改</Button>
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
  );
}
