import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Clock, Eye, FileText, Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TeamsSection = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>我的团队</CardTitle>
              <CardDescription>您所属的团队和组织</CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    加入团队
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>加入团队</DialogTitle>
                    <DialogDescription>
                      输入团队代码以加入现有团队或组织。
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="team-code">团队代码</Label>
                      <Input id="team-code" placeholder="请输入团队代码" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>加入团队</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link to="/create-team">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  创建团队
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                name: "物理学习小组",
                description: "一个学习物理概念和问题的小组",
                members: 24,
                questions: 156,
                role: "成员",
                joinedDate: "2个月前",
              },
              {
                id: 2,
                name: "数学竞赛团队",
                description: "为即将到来的数学竞赛做准备",
                members: 18,
                questions: 230,
                role: "管理员",
                joinedDate: "3个月前",
              },
              {
                id: 3,
                name: "生物研究俱乐部",
                description: "在生物学领域进行协作研究和学习",
                members: 32,
                questions: 178,
                role: "成员",
                joinedDate: "1个月前",
              },
            ].map((team) => (
              <Card key={team.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {team.description}
                        </p>
                      </div>
                      <Badge
                        variant={team.role === "管理员" ? "default" : "outline"}
                      >
                        {team.role}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{team.members} 名成员</span>
                      </div>
                      <div className="flex items-center">
                        <Brain className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{team.questions} 个问题</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{team.joinedDate} 加入</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-4 md:w-48 bg-muted/50 md:flex-col md:items-stretch">
                    <Link to={`/team/${team.id}`}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        查看团队
                      </Button>
                    </Link>
                    <Link to={`/team/${team.id}/questions`}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        问题
                      </Button>
                    </Link>
                    <Link to={`/team/${team.id}/tests`}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        测试卷
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link to="/teams">
            <Button variant="outline">查看所有团队</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>团队活动</CardTitle>
          <CardDescription>您团队的最近活动</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                team: "物理学习小组",
                action: "新增问题",
                content: "计算动能的公式是什么？",
                time: "2小时前",
              },
              {
                team: "数学竞赛团队",
                action: "新增测试卷",
                content: "代数练习测试卷 #3",
                time: "1天前",
              },
              {
                team: "生物研究俱乐部",
                action: "新增成员",
                content: "Sarah Johnson 加入了团队",
                time: "2天前",
              },
              {
                team: "物理学习小组",
                action: "问题已更新",
                content: "重力如何影响不同质量的物体？",
                time: "3天前",
              },
              {
                team: "数学竞赛团队",
                action: "公告",
                content: "周五下午4点召开会议",
                time: "4天前",
              },
            ].map((activity, i) => (
              <div key={i} className="border-b pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{activity.team}</span>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.content}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamsSection;
