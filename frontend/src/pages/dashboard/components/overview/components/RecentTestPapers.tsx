import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

const RecentTestPapers = () => {
  const recentTestPapers = [
    { title: "Geography Quiz 1", questions: 10, created: "2 days ago" },
    { title: "History Exam 2025", questions: 15, created: "1 week ago" },
    { title: "Maths Test - Chapter 3", questions: 20, created: "5 days ago" },
    { title: "Science Quiz - Physics", questions: 12, created: "3 days ago" },
    { title: "Literature Exam 1", questions: 8, created: "1 month ago" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Test Papers</CardTitle>
        <CardDescription>Test papers you've recently created or viewed</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTestPapers.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.questions} questions • Created {item.created}</p>
              </div>
              <Link to={`/test-paper/${i}`}>
                <Button variant="ghost" size="sm">View</Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/test-papers">
          <Button variant="outline">View All Test Papers</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentTestPapers;
