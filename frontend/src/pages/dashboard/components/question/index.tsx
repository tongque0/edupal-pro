import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Star, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge"
export default function Question() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Questions</CardTitle>
          <CardDescription>All questions you've generated</CardDescription>
        </div>
        <Link to="/generate">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Question
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            {
              question: "What is the capital of France?",
              subject: "Geography",
              type: "Multiple Choice",
              difficulty: "Easy",
              created: "2 days ago",
            },
            {
              question: "Explain the process of photosynthesis.",
              subject: "Science",
              type: "Essay",
              difficulty: "Medium",
              created: "3 days ago",
            },
            {
              question: "Solve for x: 2x + 5 = 15",
              subject: "Mathematics",
              type: "Short Answer",
              difficulty: "Easy",
              created: "1 week ago",
            },
            {
              question: "Who wrote 'Romeo and Juliet'?",
              subject: "Literature",
              type: "Multiple Choice",
              difficulty: "Easy",
              created: "1 week ago",
            },
            {
              question: "The Earth revolves around the Sun.",
              subject: "Science",
              type: "True/False",
              difficulty: "Easy",
              created: "2 weeks ago",
            },
            {
              question: "What are the three states of matter?",
              subject: "Science",
              type: "Short Answer",
              difficulty: "Easy",
              created: "2 weeks ago",
            },
            {
              question:
                "Describe the water cycle and its importance to Earth's ecosystems.",
              subject: "Science",
              type: "Essay",
              difficulty: "Medium",
              created: "3 weeks ago",
            },
            {
              question: "What is the Pythagorean theorem?",
              subject: "Mathematics",
              type: "Short Answer",
              difficulty: "Medium",
              created: "1 month ago",
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
                  Created {item.created}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Star className="h-4 w-4" />
                  <span className="sr-only">Favorite</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Link to={`/question/${i}`}>
                  <Button variant="outline" size="sm" className="px-2 h-8">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing 8 of 127 questions
        </div>
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
  );
}
