import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";

import Overview from "@/pages/dashboard/components/overview";
import Team from "@/pages/dashboard/components/team";
import Question from "@/pages/dashboard/components/question";
import Favorites from "@/pages/dashboard/components/favorites";
import Test from "@/pages/dashboard/components/test";
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <Link to="/question/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Question
              </Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="teams">我的团队</TabsTrigger>
              <TabsTrigger value="my-questions">我的问题</TabsTrigger>
              <TabsTrigger value="my-tests">我的试卷</TabsTrigger>
              <TabsTrigger value="favorites">收藏夹</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          <TabsContent value="my-questions">
            <Question />
          </TabsContent>
          <TabsContent value="my-tests">
            <Test />
          </TabsContent>
          <TabsContent value="teams">
            <Team />
          </TabsContent>
          <TabsContent value="favorites">
            <Favorites />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
