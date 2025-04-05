"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import GenQuestion from "@/pages/question-new/components/GenQuestion";
import QuestionList from "@/pages/question-new/components/QuestionList";
import QuestionDialog, {
  QuestionDetail,
} from "@/components/dialog/QuestionDialog";
export default function GeneratePage() {
  const [tabValue, setTabValue] = useState("ai");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionDetail | null>(null);

  const handleTabChange = (value: string) => {
    if (value === "manual") {
      // 手动创建时弹出空白对话框
      setSelectedQuestion({
        question: "",
        type: "",
        subject: "",
        grade: "",
        difficulty: "",
        creator: "",
      });
      setDialogOpen(true);
    } else {
      setTabValue(value);
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Tabs
              value={tabValue}
              onValueChange={handleTabChange}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ai">AI 生成</TabsTrigger>
                <TabsTrigger value="manual">手动创建</TabsTrigger>
              </TabsList>

              <TabsContent value="ai">
                <GenQuestion />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <QuestionList />
          </div>
        </div>
      </main>

      <QuestionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        data={selectedQuestion}
        mode="create"
      />
    </div>
  );
}
