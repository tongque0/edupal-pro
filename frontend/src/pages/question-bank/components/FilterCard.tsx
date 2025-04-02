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
    dispatch(setFilter({ key: "orderBy", value: "newest" }));
  };

  const handleApplyFilters = () => {
    console.log("应用筛选：", reduxFilters);
  };

  const filterConfig = [
    {
      key: "subject",
      label: "科目",
      options: [
        { label: "所有", value: "all" },
        { label: "数学", value: "数学" },
        { label: "科学", value: "科学" },
        { label: "历史", value: "历史" },
        { label: "地理", value: "地理" },
        { label: "文学", value: "文学" },
      ],
    },
    {
      key: "difficulty",
      label: "难度",
      options: [
        { label: "所有", value: "all" },
        { label: "简单", value: "简单" },
        { label: "中等", value: "中等" },
        { label: "困难", value: "困难" },
      ],
    },
    {
      key: "type",
      label: "类型",
      options: [
        { label: "所有", value: "all" },
        { label: "选择题", value: "选择题" },
        { label: "判断题", value: "判断题" },
        { label: "简答题", value: "简答题" },
        { label: "作文题", value: "作文题" },
        { label: "其他", value: "其他" },
      ],
    },
    {
      key: "creator",
      label: "创建者",
      options: [
        { label: "所有", value: "all" },
        { label: "我", value: "我" },
        { label: "教师", value: "教师" },
        { label: "学生", value: "学生" },
      ],
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
          <Button variant="default" onClick={handleApplyFilters}>
            筛选
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
