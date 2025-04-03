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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";


export default function NewQuestion() {
  return (
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
            onValueChange={(value) => handleManualQuestionChange("type", value)}
          >
            <SelectTrigger id="question-type">
              <SelectValue placeholder="选择问题类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multipleChoice">多项选择</SelectItem>
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
                  onChange={(e) => handleOptionChange(index, e.target.value)}
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
              handleManualQuestionChange("explanation", e.target.value)
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
  );
}
