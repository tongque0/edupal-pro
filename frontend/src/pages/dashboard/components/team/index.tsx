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
              <CardTitle>My Teams</CardTitle>
              <CardDescription>
                Teams and organizations you're a member of
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Join Team
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join a Team</DialogTitle>
                    <DialogDescription>
                      Enter a team code to join an existing team or
                      organization.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="team-code">Team Code</Label>
                      <Input id="team-code" placeholder="Enter team code" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button>Join Team</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Link to="/create-team">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Team
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
                name: "Physics Study Group",
                description:
                  "A group for studying physics concepts and problems",
                members: 24,
                questions: 156,
                role: "Member",
                joinedDate: "2 months ago",
              },
              {
                id: 2,
                name: "Math Competition Team",
                description:
                  "Preparation for upcoming mathematics competitions",
                members: 18,
                questions: 230,
                role: "Admin",
                joinedDate: "3 months ago",
              },
              {
                id: 3,
                name: "Biology Research Club",
                description: "Collaborative research and study in biology",
                members: 32,
                questions: 178,
                role: "Member",
                joinedDate: "1 month ago",
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
                        variant={team.role === "Admin" ? "default" : "outline"}
                      >
                        {team.role}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm">
                      <div className="flex items-center">
                        <User className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{team.members} members</span>
                      </div>
                      <div className="flex items-center">
                        <Brain className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>{team.questions} questions</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        <span>Joined {team.joinedDate}</span>
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
                        View Team
                      </Button>
                    </Link>
                    <Link to={`/team/${team.id}/questions`}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Brain className="mr-2 h-4 w-4" />
                        Questions
                      </Button>
                    </Link>
                    <Link to={`/team/${team.id}/tests`}>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Test Papers
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
            <Button variant="outline">View All Teams</Button>
          </Link>
        </CardFooter>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Team Activity</CardTitle>
          <CardDescription>Recent activity in your teams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                team: "Physics Study Group",
                action: "New question added",
                content: "What is the formula for calculating kinetic energy?",
                time: "2 hours ago",
              },
              {
                team: "Math Competition Team",
                action: "New test paper",
                content: "Algebra Practice Test #3",
                time: "1 day ago",
              },
              {
                team: "Biology Research Club",
                action: "New member joined",
                content: "Sarah Johnson joined the team",
                time: "2 days ago",
              },
              {
                team: "Physics Study Group",
                action: "Question updated",
                content: "How does gravity affect objects of different masses?",
                time: "3 days ago",
              },
              {
                team: "Math Competition Team",
                action: "Announcement",
                content: "Meeting scheduled for Friday at 4 PM",
                time: "4 days ago",
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
