"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GenQuestion from "@/pages/question-new/components/GenQuestion";
import NewQuestion from "@/pages/question-new/components/NewQuestion";
import QuestionList from "@/pages/question-new/components/QuestionList";
export default function GeneratePage() {
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
                <GenQuestion />
              </TabsContent>

              {/* 手动创建标签内容 */}
              <TabsContent value="manual">
                {/* <NewQuestion /> */}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            {/* <QuestionList /> */}
          </div>
        </div>
      </main>
    </div>
  );
}
