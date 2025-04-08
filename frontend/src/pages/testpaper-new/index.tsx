"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Save } from "lucide-react";
import { TestpaperDialog } from "@/components/dialog/TestpaperDialog";
import TestPaperInfo from "@/pages/testpaper-new/components/testpaperinfo";
import QuestionBank from "@/pages/testpaper-new/components/questionbank";
import TestQuestion from "@/pages/testpaper-new/components/testquestion";
export default function CreateTestPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

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
            <TestPaperInfo />
            {/* 题库区域 */}
            <div className="border rounded-md ">
              <QuestionBank />
            </div>
          </div>
            <TestQuestion />
        </div>
      </main>

      {/* 弹窗显示题目详情 */}
      <TestpaperDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={null}
      />
    </div>
  );
}
