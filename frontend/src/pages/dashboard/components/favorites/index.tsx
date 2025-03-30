import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Star } from "lucide-react";

export default function Favorites() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Items</CardTitle>
        <CardDescription>
          Questions and test papers you've saved as favorites
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="questions">
          <TabsList className="mb-4">
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="test-papers">Test Papers</TabsTrigger>
          </TabsList>

          <TabsContent value="questions" className="space-y-4">
            {[
              {
                question: "What is the water cycle?",
                type: "Question",
                subject: "Science",
                savedDate: "1 week ago",
              },
              {
                question: "Who wrote Romeo and Juliet?",
                type: "Question",
                subject: "Literature",
                savedDate: "2 weeks ago",
              },
              {
                question: "What is the capital of Japan?",
                type: "Question",
                subject: "Geography",
                savedDate: "3 weeks ago",
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
                      Saved {item.savedDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="sr-only">Remove from favorites</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="test-papers" className="space-y-4">
            {[
              {
                title: "Math Quiz - Algebra",
                type: "Test Paper",
                subject: "Mathematics",
                savedDate: "5 days ago",
              },
              {
                title: "Geography Final Exam",
                type: "Test Paper",
                subject: "Geography",
                savedDate: "1 week ago",
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
                      Saved {item.savedDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="sr-only">Remove from favorites</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    View
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
