"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
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

import { setFilter } from "@/modules/question";
import { useAppDispatch, useAppSelector } from "@/modules/stores";
import { useEffect, useState, useMemo } from "react";
import { getQuestions } from "@/api/question";
import QuestionDialog,{QuestionDetail} from "@/components/dialog/QuestionDialog";



export default function QuestionTable() {
  const dispatch = useAppDispatch();
  const reduxFilters = useAppSelector((state) => state.question.filters);
  const { search, page, pageSize, subject, type, difficulty, grade } =
    reduxFilters;

  const currentPage = page ? Number.parseInt(page as string, 10) - 1 : 0;
  const currentPageSize = pageSize
    ? Number.parseInt(pageSize as string, 10)
    : 10;

  const [pageInput, setPageInput] = useState<string>(String(currentPage + 1));
  const [data, setData] = useState<QuestionDetail[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionDetail| null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = Object.fromEntries(
          Object.entries({
            subject: subject,
            difficulty: difficulty,
            type: type,
            grade: grade,
            page: currentPage + 1,
            page_size: currentPageSize,
          }).filter(([_, v]) => v !== "all")
        );
        const res = await getQuestions(params);
        const mapped = (res.data || []).map((item: any) => ({
          ...item,
          question: item.content.trim(),
          type: item.type || "未知",
        }));
        setData(mapped);
        setTotalCount(res.total_count || 0);
      } catch (error) {
        console.error("获取题库数据失败:", error);
      }
    };
    fetchData();
  }, [currentPage, currentPageSize, search, subject, difficulty, type, grade]);

  const handleEdit = (question: QuestionDetail) => {
    setSelectedQuestion(question);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log("收藏", id);
  };

  const columns: ColumnDef<QuestionDetail>[] = useMemo(
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
        cell: ({ getValue }) => (
          <div className="max-w-[200px] truncate">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "subject",
        header: "学科",
        cell: ({ getValue }) => (
          <div
            className={`max-w-[150px] truncate font-medium px-2 py-1 rounded-full text-sm inline-block ${
              getValue() === "数学"
                ? "bg-blue-50 text-blue-600"
                : getValue() === "英语"
                ? "bg-green-50 text-green-600"
                : getValue() === "物理"
                ? "bg-purple-50 text-purple-600"
                : "bg-gray-50 text-gray-700"
            }`}
          >
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "题型",
        cell: ({ getValue }) => (
          <div className="max-w-[150px] truncate">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "difficulty",
        header: "难度",
        cell: ({ getValue }) => (
          <div className="max-w-[150px] truncate">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: "grade",
        header: "年级",
        cell: ({ getValue }) => (
          <div className="max-w-[150px] truncate">{getValue() as string}</div>
        ),
      },
      {
        id: "actions",
        header: "操作",
        cell: ({ row }) => {
          const question = row.original;
          return (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => handleEdit(question)}
              >
                详情
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="font-medium hover:bg-amber-50 hover:text-amber-600 transition-colors"
                onClick={() => question.id && handleDelete(String(question.id))}
              >
                收藏
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

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
        setFilter({ key: "page", value: String(newPagination.pageIndex + 1) })
      );
      dispatch(
        setFilter({ key: "pageSize", value: String(newPagination.pageSize) })
      );
    },
    manualPagination: true,
    pageCount: Math.ceil(totalCount / currentPageSize),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id?.toString() || "",
  });

  useEffect(() => {
    setPageInput(String(currentPage + 1));
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      table.getColumn("question")?.setFilterValue(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, table]);

  const pageSizeOptions = [5, 10, 20, 50];

  const handlePageSizeChange = React.useCallback(
    (value: string) => {
      table.setPageSize(Number(value));
    },
    [table]
  );

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(e.target.value);
  };

  const handlePageJump = () => {
    const pageNumber = Number.parseInt(pageInput, 10);
    if (
      !isNaN(pageNumber) &&
      pageNumber > 0 &&
      pageNumber <= table.getPageCount()
    ) {
      table.setPageIndex(pageNumber - 1);
    } else {
      setPageInput(String(table.getState().pagination.pageIndex + 1));
    }
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePageJump();
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center gap-3 py-6">
        <div className="flex w-full md:w-auto">
          <Input
            placeholder="搜索题目..."
            value={search}
            onChange={(e) =>
              dispatch(setFilter({ key: "search", value: e.target.value }))
            }
            className="w-full md:w-[320px] rounded-r-none focus-visible:ring-2"
          />
          <Button className="rounded-l-none">搜索</Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto whitespace-nowrap">
              显示列 <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const columnName =
                  {
                    question: "题目",
                    type: "题型",
                    subject: "科目",
                    difficulty: "难度",
                    creator: "创建者",
                    grade: "年级",
                  }[column.id] || column.id;
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnName}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-xl shadow-lg border border-gray-200 overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-700 text-sm font-semibold py-4 px-4"
                  >
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
                  className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="align-middle py-3 px-4">
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6">
        <div className="text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
          共 <span className="font-bold text-gray-900">{totalCount}</span>{" "}
          条记录
        </div>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
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
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <Button
              variant="outline"
              size="sm"
              className="font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              上一页
            </Button>
            <div className="flex items-center space-x-1">
              <p className="text-sm">前往</p>
              <Input
                className="h-8 w-16 text-center font-medium"
                type="text"
                value={pageInput}
                onChange={handlePageInputChange}
                onKeyDown={handlePageInputKeyDown}
                onBlur={handlePageJump}
              />
              <p className="text-sm">页</p>
              <span className="mx-1 text-sm">
                (共 {table.getPageCount()} 页)
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              下一页
            </Button>
          </div>
        </div>
      </div>

      {/* 弹窗显示题目详情 */}
      {selectedQuestion && (
        <QuestionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          data={selectedQuestion}
          mode="preview"
        />
      )}
    </div>
  );
}
