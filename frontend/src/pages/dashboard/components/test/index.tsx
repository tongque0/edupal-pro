import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Plus,  Star, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge"
export default function Test() {
    return (
        <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>My Test Papers</CardTitle>
            <CardDescription>All test papers you've created</CardDescription>
          </div>
          <Link to="/create-test">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              New Test Paper
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                title: "Geography Quiz",
                description: "10 questions about world geography",
                subject: "Geography",
                questions: 10,
                created: "2 days ago",
                lastEdited: "Yesterday",
              },
              {
                title: "Math Test - Algebra",
                description: "Test covering basic algebraic concepts",
                subject: "Mathematics",
                questions: 15,
                created: "1 week ago",
                lastEdited: "3 days ago",
              },
              {
                title: "Science Quiz - Biology",
                description: "Questions about cells and organisms",
                subject: "Science",
                questions: 12,
                created: "3 days ago",
                lastEdited: "3 days ago",
              },
              {
                title: "Literature Final",
                description: "Comprehensive test on classic literature",
                subject: "Literature",
                questions: 20,
                created: "1 month ago",
                lastEdited: "2 weeks ago",
              },
              {
                title: "History Midterm",
                description: "Test covering ancient civilizations",
                subject: "History",
                questions: 25,
                created: "2 months ago",
                lastEdited: "1 month ago",
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
                      <span className="font-medium">{item.questions}</span> questions
                    </div>
                    <div className="text-sm text-muted-foreground">Created {item.created}</div>
                    <div className="text-sm text-muted-foreground">Last edited {item.lastEdited}</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Star className="h-4 w-4" />
                      <span className="sr-only">Favorite</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                  <Link to={`/test-paper/${i}`}>
                    <Button size="sm">View</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">Showing 5 of 12 test papers</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    )
}
