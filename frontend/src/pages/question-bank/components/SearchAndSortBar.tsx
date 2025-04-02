import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/modules/stores";
import { setFilter } from "@/modules/question"; // 假设你有这些 action creators
import { useState, useEffect } from "react";

export default function SearchAndSortBar() {
  const dispatch = useAppDispatch();
  const { search, orderBy} = useAppSelector((state) => state.question.filters);

  // 使用本地状态来处理输入，避免每次按键都触发 Redux 更新
  const [searchInput, setSearchInput] = useState(search || "");

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // 使用防抖来减少搜索请求次数
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchInput !== search) {
        dispatch(setFilter({ key: "search", value: searchInput })); // 更新 Redux store
      }
    }, 300); // 300ms 防抖

    return () => clearTimeout(debounceTimer);
  }, [searchInput, dispatch, search]);

  // 处理排序变化
  const handleSortChange = (value: string) => {
    dispatch(setFilter({ key: "orderBy", value }));
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="搜索题目或试卷..."
          className="w-full pl-8"
          value={searchInput}
          onChange={handleSearchChange}
        />
      </div>
      <Select
        value={orderBy || "newest"}
        onValueChange={handleSortChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="排序方式" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">最新优先</SelectItem>
          <SelectItem value="oldest">最旧优先</SelectItem>
          <SelectItem value="popular">最受欢迎</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
