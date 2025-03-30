import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Star, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
export default function Test() {
    return (
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>我的试卷</CardTitle>
            <CardDescription>您创建的所有试卷</CardDescription>
          </div>
          <Link to="/testpaper/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              新建试卷
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                title: "地理测验",
                description: "关于世界地理的10道题",
                subject: "地理",
                questions: 10,
                created: "2天前",
                lastEdited: "昨天",
              },
              {
                title: "数学测试 - 代数",
                description: "涵盖基础代数概念的测试",
                subject: "数学",
                questions: 15,
                created: "1周前",
                lastEdited: "3天前",
              },
              {
                title: "科学测验 - 生物学",
                description: "关于细胞和生物体的问题",
                subject: "科学",
                questions: 12,
                created: "3天前",
                lastEdited: "3天前",
              },
              {
                title: "文学期末考试",
                description: "关于经典文学的综合测试",
                subject: "文学",
                questions: 20,
                created: "1个月前",
                lastEdited: "2周前",
              },
              {
                title: "历史期中考试",
                description: "涵盖古代文明的测试",
                subject: "历史",
                questions: 25,
                created: "2个月前",
                lastEdited: "1个月前",
              },
            ].map((item, i) => (
              <Card key={i} className="border border-muted">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{item.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/10 dark:text-blue-400"
                    >
                      {item.subject}
                    </Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-2">
                    <div className="text-sm">
                      <span className="font-medium">{item.questions}</span> 道题
                    </div>
                    <div className="text-sm text-muted-foreground">创建于 {item.created}</div>
                    <div className="text-sm text-muted-foreground">最后编辑于 {item.lastEdited}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star className="h-4 w-4" />
                      <span className="sr-only">收藏</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">编辑</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">删除</span>
                    </Button>
                  </div>
                  <Link to={`/test-paper/${i}`}>
                    <Button size="sm">查看</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">显示 5 个试卷，共 12 个</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              上一页
            </Button>
            <Button variant="outline" size="sm">
              下一页
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
}
