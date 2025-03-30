import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Star } from "lucide-react";

export default function Favorites() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>收藏夹</CardTitle>
                <CardDescription>
                    您保存为收藏的问题和试卷
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="questions">
                    <TabsList className="mb-4">
                        <TabsTrigger value="questions">问题</TabsTrigger>
                        <TabsTrigger value="test-papers">试卷</TabsTrigger>
                    </TabsList>

                    <TabsContent value="questions" className="space-y-4">
                        {[
                            {
                                question: "什么是水循环？",
                                type: "问题",
                                subject: "科学",
                                savedDate: "1周前",
                            },
                            {
                                question: "谁写了《罗密欧与朱丽叶》？",
                                type: "问题",
                                subject: "文学",
                                savedDate: "2周前",
                            },
                            {
                                question: "日本的首都是什么？",
                                type: "问题",
                                subject: "地理",
                                savedDate: "3周前",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">{item.question}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-muted-foreground">
                                            {item.subject}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            收藏于 {item.savedDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span className="sr-only">从收藏夹中移除</span>
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        查看
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="test-papers" className="space-y-4">
                        {[
                            {
                                title: "数学测验 - 代数",
                                type: "试卷",
                                subject: "数学",
                                savedDate: "5天前",
                            },
                            {
                                title: "地理期末考试",
                                type: "试卷",
                                subject: "地理",
                                savedDate: "1周前",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-muted-foreground">
                                            {item.subject}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            收藏于 {item.savedDate}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <Star className="h-4 w-4 text-yellow-500" />
                                        <span className="sr-only">从收藏夹中移除</span>
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        查看
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
