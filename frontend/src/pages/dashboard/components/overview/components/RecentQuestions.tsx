import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const RecentQuestions = () => {
  const recentQuestions = [
    { question: "What is the capital of France?", subject: "Geography", type: "Multiple Choice" },
    { question: "Who wrote 'To Kill a Mockingbird'?", subject: "Literature", type: "Multiple Choice" },
    { question: "What is the boiling point of water?", subject: "Science", type: "True/False" },
    { question: "In which year did the Titanic sink?", subject: "History", type: "Multiple Choice" },
    { question: "What is the largest planet in our solar system?", subject: "Astronomy", type: "Multiple Choice" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Questions</CardTitle>
        <CardDescription>Questions you've recently generated or interacted with</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentQuestions.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.question}</p>
                <p className="text-sm text-muted-foreground">{item.subject} • {item.type}</p>
              </div>
              <Link to={`/question/${i}`}>
                <Button variant="ghost" size="sm">View</Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/question-bank">
          <Button variant="outline">View All Questions</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentQuestions;
