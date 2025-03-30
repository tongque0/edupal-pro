import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Star, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
export default function Question() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>我的问题</CardTitle>
                    <CardDescription>您生成的所有问题</CardDescription>
                </div>
                <Link to="/question/new">
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        新建问题
                    </Button>
                </Link>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {[
                        {
                            question: "法国的首都是哪里？",
                            subject: "地理",
                            type: "选择题",
                            difficulty: "简单",
                            created: "2天前",
                        },
                        {
                            question: "解释光合作用的过程。",
                            subject: "科学",
                            type: "作文",
                            difficulty: "中等",
                            created: "3天前",
                        },
                        {
                            question: "解方程：2x + 5 = 15",
                            subject: "数学",
                            type: "简答题",
                            difficulty: "简单",
                            created: "1周前",
                        },
                        {
                            question: "谁写了《罗密欧与朱丽叶》？",
                            subject: "文学",
                            type: "选择题",
                            difficulty: "简单",
                            created: "1周前",
                        },
                        {
                            question: "地球围绕太阳旋转。",
                            subject: "科学",
                            type: "判断题",
                            difficulty: "简单",
                            created: "2周前",
                        },
                        {
                            question: "物质的三态是什么？",
                            subject: "科学",
                            type: "简答题",
                            difficulty: "简单",
                            created: "2周前",
                        },
                        {
                            question: "描述水循环及其对地球生态系统的重要性。",
                            subject: "科学",
                            type: "作文",
                            difficulty: "中等",
                            created: "3周前",
                        },
                        {
                            question: "什么是勾股定理？",
                            subject: "数学",
                            type: "简答题",
                            difficulty: "中等",
                            created: "1个月前",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between border-b pb-4"
                        >
                            <div className="space-y-1">
                                <p className="font-medium">{item.question}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    <Badge
                                        variant="outline"
                                        className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/10 dark:text-blue-400"
                                    >
                                        {item.subject}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/10 dark:text-yellow-400"
                                    >
                                        {item.type}
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/10 dark:text-green-400"
                                    >
                                        {item.difficulty}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    创建于 {item.created}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Star className="h-4 w-4" />
                                    <span className="sr-only">收藏</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">编辑</span>
                                </Button>
                                <Link to={`/question/${i}`}>
                                    <Button variant="outline" size="sm" className="px-2 h-8">
                                        查看
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                    显示 8 条，共 127 条问题
                </div>
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
    );
}
