"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Question = {
  id: string;
  question: string;
  type: string;
  subject: string;
  difficulty: string;
  creator: string;
};
import { setFilter } from "@/modules/question";
import { useAppDispatch, useAppSelector } from "@/modules/stores";

export default function QuestionTable() {
  const dispatch = useAppDispatch();
  const reduxFilters = useAppSelector((state) => state.question.filters);
  const { search, page, pageSize } = reduxFilters;
  // 将 Redux 中的 string 类型转换为 number 类型
  const currentPage = page ? parseInt(page as string, 10) - 1 : 0; // 减 1 是因为 TanStack Table 的页码从 0 开始
  const currentPageSize = pageSize ? parseInt(pageSize as string, 10) : 10; // 默认每页 10 条

  // 使用useMemo记忆化数据，避免重复创建
  const data: Question[] = React.useMemo(
    () => [
      {
        id: "1",
        question: "法国的首都是哪里？",
        type: "选择题",
        subject: "地理",
        difficulty: "简单",
        creator: "教师",
      },
      {
        id: "2",
        question: "解释光合作用的过程。",
        type: "作文题",
        subject: "科学",
        difficulty: "中等",
        creator: "教师",
      },
      {
        id: "3",
        question: "解方程：2x + 5 = 15",
        type: "简答题",
        subject: "数学",
        difficulty: "简单",
        creator: "学生",
      },
      {
        id: "4",
        question: "《罗密欧与朱丽叶》的作者是谁？",
        type: "选择题",
        subject: "文学",
        difficulty: "简单",
        creator: "教师",
      },
      {
        id: "5",
        question: "地球围绕太阳旋转。",
        type: "判断题",
        subject: "科学",
        difficulty: "简单",
        creator: "教师",
      },
      // 添加更多数据以便测试分页
      {
        id: "6",
        question: "什么是函数式编程？",
        type: "简答题",
        subject: "计算机",
        difficulty: "中等",
        creator: "教师",
      },
      {
        id: "7",
        question: "1+1=?",
        type: "填空题",
        subject: "数学",
        difficulty: "简单",
        creator: "学生",
      },
      {
        id: "8",
        question: "太阳系有几个行星？",
        type: "填空题",
        subject: "天文",
        difficulty: "简单",
        creator: "教师",
      },
      {
        id: "9",
        question: "解释相对论的基本原理",
        type: "作文题",
        subject: "物理",
        difficulty: "困难",
        creator: "教师",
      },
      {
        id: "10",
        question: "JavaScript中的闭包是什么？",
        type: "简答题",
        subject: "计算机",
        difficulty: "中等",
        creator: "教师",
      },
      {
        id: "11",
        question: "人类基因组包含多少对碱基对？",
        type: "填空题",
        subject: "生物",
        difficulty: "中等",
        creator: "教师",
      },
      {
        id: "12",
        question: "什么是后端渲染和前端渲染？",
        type: "简答题",
        subject: "计算机",
        difficulty: "中等",
        creator: "教师",
      },
    ],
    []
  );

  const columns: ColumnDef<Question>[] = React.useMemo(
    () => [
      {
        accessorKey: "question",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            题目 <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "type",
        header: "题型",
      },
      {
        accessorKey: "subject",
        header: "科目",
      },
      {
        accessorKey: "difficulty",
        header: "难度",
      },
      {
        accessorKey: "creator",
        header: "创建者",
      },
    ],
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: currentPage,
        pageSize: currentPageSize,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    onPaginationChange: (updater) => {
      let newPagination;
      if (typeof updater === "function") {
        newPagination = updater({
          pageIndex: currentPage,
          pageSize: currentPageSize,
        });
      } else {
        newPagination = updater;
      }

      dispatch(
        setFilter({
          key: "page",
          value: String(newPagination.pageIndex + 1),
        })
      );

      dispatch(
        setFilter({
          key: "pageSize",
          value: String(newPagination.pageSize),
        })
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id,
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      table.getColumn("question")?.setFilterValue(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, table]);

  // 每页显示记录数选项
  const pageSizeOptions = [5, 10, 20, 50];

  // 页码选项器组件
  const handlePageSizeChange = React.useCallback(
    (value: string) => {
      table.setPageSize(Number(value));
    },
    [table]
  );

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="搜索题目..."
          value={search}
          onChange={(e) =>
            dispatch(setFilter({ key: "search", value: e.target.value }))
          }
          className="max-w-sm"
        />
        <Button className="ml-2">
          搜索
        </Button>
        {/* 列显示*/}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              显示列 <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                // 使用key作为列名显示
                const columnName =
                  {
                    question: "题目",
                    type: "题型",
                    subject: "科目",
                    difficulty: "难度",
                    creator: "创建者",
                  }[column.id] || column.id;

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(!!value);
                    }}
                  >
                    {columnName}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 表格 */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  没有匹配的结果
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 分页器 */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          共 {table.getFilteredRowModel().rows.length} 条记录
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">每页显示</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={handlePageSizeChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm font-medium">条</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              上一页
            </Button>
            <div className="flex items-center justify-center text-sm font-medium">
              第 {table.getState().pagination.pageIndex + 1} 页，共{" "}
              {table.getPageCount()} 页
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              下一页
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
