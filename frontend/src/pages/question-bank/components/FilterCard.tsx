import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/modules/stores";
import { QuestionFilters, setFilter } from "@/modules/question";
import {
  typeOptions,
  subjectOptions,
  difficultyOptions,
  gradeOptions,
} from "@/types/Options";
export default function FilterCard() {
  const dispatch = useAppDispatch();
  const reduxFilters = useAppSelector((state) => state.question.filters);

  const handleFilterChange = (key: keyof QuestionFilters, value: string) => {
    dispatch(setFilter({ key, value }));
  };

  const handleResetFilters = () => {
    filterConfig.forEach((filter) => {
      dispatch(
        setFilter({ key: filter.key as keyof QuestionFilters, value: "all" })
      );
    });
    dispatch(setFilter({ key: "search", value: "" }));
  };

  const filterConfig = [
    {
      key: "subject",
      label: "科目",
      options: subjectOptions,
    },
    {
      key: "difficulty",
      label: "难度",
      options: difficultyOptions,
    },
    {
      key: "type",
      label: "类型",
      options: typeOptions,
    },
    {
      key: "grade",
      label: "年级",
      options: gradeOptions,
    },
  ];

  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>筛选条件</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 筛选字段网格布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filterConfig.map((field, idx) => (
            <div className="space-y-2" key={idx}>
              <label className="text-sm font-medium">{field.label}</label>
              <Select
                value={
                  reduxFilters[field.key as keyof QuestionFilters] || "all"
                }
                onValueChange={(value) =>
                  handleFilterChange(field.key as keyof QuestionFilters, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder={field.label} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((opt, i) => (
                    <SelectItem key={i} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={handleResetFilters}>
            重置
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
