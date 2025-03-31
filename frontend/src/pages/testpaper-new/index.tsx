"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  Search,
  Plus,
  GripVertical,
  X,
  Eye,
  Save,
  Download,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function CreateTestPage() {
  // State for test paper metadata
  const [testPaper, setTestPaper] = useState({
    title: "",
    description: "",
    instructions: "",
    subject: "",
    timeLimit: 60, // in minutes
  });

  // State for selected questions
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    subject: "all",
    difficulty: "all",
    type: "all",
  });

  // Sample questions for the question bank
  const questionBank = [
    {
      id: "q1",
      question: "What is the capital of France?",
      type: "Multiple Choice",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      difficulty: "Easy",
      subject: "Geography",
    },
    {
      id: "q2",
      question: "Explain the process of photosynthesis.",
      type: "Essay",
      answer:
        "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll.",
      difficulty: "Medium",
      subject: "Science",
    },
    {
      id: "q3",
      question: "Solve for x: 2x + 5 = 15",
      type: "Short Answer",
      answer: "x = 5",
      difficulty: "Easy",
      subject: "Mathematics",
    },
    {
      id: "q4",
      question: "Who wrote 'Romeo and Juliet'?",
      type: "Multiple Choice",
      options: [
        "William Shakespeare",
        "Charles Dickens",
        "Jane Austen",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      difficulty: "Easy",
      subject: "Literature",
    },
    {
      id: "q5",
      question: "The Earth revolves around the Sun.",
      type: "True/False",
      answer: "True",
      difficulty: "Easy",
      subject: "Science",
    },
    {
      id: "q6",
      question: "What are the three states of matter?",
      type: "Short Answer",
      answer: "Solid, liquid, and gas",
      difficulty: "Easy",
      subject: "Science",
    },
    {
      id: "q7",
      question: "Calculate the area of a circle with radius 5cm.",
      type: "Short Answer",
      answer: "78.54 square cm",
      difficulty: "Medium",
      subject: "Mathematics",
    },
    {
      id: "q8",
      question: "Name the seven continents of the world.",
      type: "Short Answer",
      answer:
        "Asia, Africa, North America, South America, Antarctica, Europe, and Australia",
      difficulty: "Medium",
      subject: "Geography",
    },
    {
      id: "q9",
      question: "What is the main theme of 'To Kill a Mockingbird'?",
      type: "Essay",
      answer:
        "The main themes include racial injustice, moral growth, and the coexistence of good and evil.",
      difficulty: "Hard",
      subject: "Literature",
    },
    {
      id: "q10",
      question: "Describe Newton's three laws of motion.",
      type: "Essay",
      answer:
        "First law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. Second law: Force equals mass times acceleration. Third law: For every action, there is an equal and opposite reaction.",
      difficulty: "Hard",
      subject: "Science",
    },
  ];

  // Filter questions based on search query and filters
  const filteredQuestions = questionBank.filter((q) => {
    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by subject
    const matchesSubject =
      filters.subject === "all" ||
      q.subject.toLowerCase() === filters.subject.toLowerCase();

    // Filter by difficulty
    const matchesDifficulty =
      filters.difficulty === "all" ||
      q.difficulty.toLowerCase() === filters.difficulty.toLowerCase();

    // Filter by type
    const matchesType =
      filters.type === "all" ||
      q.type.toLowerCase() === filters.type.toLowerCase();

    return matchesSearch && matchesSubject && matchesDifficulty && matchesType;
  });

  // Add question to test paper
  const addQuestion = (question) => {
    if (!selectedQuestions.some((q) => q.id === question.id)) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  // Remove question from test paper
  const removeQuestion = (questionId) => {
    setSelectedQuestions(selectedQuestions.filter((q) => q.id !== questionId));
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(selectedQuestions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedQuestions(items);
  };

  // Calculate estimated time
  const calculateEstimatedTime = () => {
    let totalMinutes = 0;

    selectedQuestions.forEach((q) => {
      if (q.type === "Multiple Choice" || q.type === "True/False") {
        totalMinutes += 1;
      } else if (q.type === "Short Answer") {
        totalMinutes += 3;
      } else if (q.type === "Essay") {
        totalMinutes += 10;
      }
    });

    return totalMinutes;
  };

  // Handle input changes for test paper metadata
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTestPaper({
      ...testPaper,
      [name]: value,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">New TestPaper</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>
                    {testPaper.title || "Untitled Test Paper"}
                  </DialogTitle>
                  <DialogDescription>
                    {testPaper.description || "No description provided."}
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-6">
                  {testPaper.instructions && (
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Instructions:</h3>
                      <p>{testPaper.instructions}</p>
                    </div>
                  )}

                  <div className="space-y-6">
                    {selectedQuestions.map((q, index) => (
                      <div key={q.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">
                            {index + 1}. {q.question}
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/10 dark:text-blue-400"
                          >
                            {q.type}
                          </Badge>
                        </div>

                        {q.type === "Multiple Choice" && (
                          <div className="space-y-2 ml-6">
                            {q.options.map((option, j) => (
                              <div
                                key={j}
                                className="flex items-center space-x-2"
                              >
                                <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                                <span>{option}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {q.type === "True/False" && (
                          <div className="space-y-2 ml-6">
                            <div className="flex items-center space-x-2">
                              <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                              <span>True</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                              <span>False</span>
                            </div>
                          </div>
                        )}

                        {q.type === "Short Answer" && (
                          <div className="ml-6 mt-2">
                            <div className="border border-dashed border-muted-foreground p-2 rounded-md">
                              <p className="text-muted-foreground text-sm">
                                Answer space
                              </p>
                            </div>
                          </div>
                        )}

                        {q.type === "Essay" && (
                          <div className="ml-6 mt-2">
                            <div className="border border-dashed border-muted-foreground p-4 rounded-md min-h-[100px]">
                              <p className="text-muted-foreground text-sm">
                                Essay response area
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button>Publish Test Paper</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Question Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Paper Details</CardTitle>
                <CardDescription>
                  Enter the basic information for your test paper
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter test paper title"
                    value={testPaper.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Brief description of the test paper"
                    className="resize-none"
                    value={testPaper.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    name="instructions"
                    placeholder="Instructions for students taking the test"
                    className="resize-none"
                    value={testPaper.instructions}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={testPaper.subject}
                      onValueChange={(value) =>
                        setTestPaper({ ...testPaper, subject: value })
                      }
                    >
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                    <Input
                      id="timeLimit"
                      name="timeLimit"
                      type="number"
                      min="1"
                      value={testPaper.timeLimit}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Bank</CardTitle>
                <CardDescription>
                  Search and filter questions to add to your test paper
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search questions..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="filter-subject">Subject</Label>
                    <Select
                      value={filters.subject}
                      onValueChange={(value) =>
                        setFilters({ ...filters, subject: value })
                      }
                    >
                      <SelectTrigger id="filter-subject">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filter-difficulty">Difficulty</Label>
                    <Select
                      value={filters.difficulty}
                      onValueChange={(value) =>
                        setFilters({ ...filters, difficulty: value })
                      }
                    >
                      <SelectTrigger id="filter-difficulty">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filter-type">Question Type</Label>
                    <Select
                      value={filters.type}
                      onValueChange={(value) =>
                        setFilters({ ...filters, type: value })
                      }
                    >
                      <SelectTrigger id="filter-type">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="multiple choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="true/false">True/False</SelectItem>
                        <SelectItem value="short answer">
                          Short Answer
                        </SelectItem>
                        <SelectItem value="essay">Essay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {filteredQuestions.map((question) => (
                      <Card key={question.id} className="border border-muted">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-base">
                              {question.question}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 pb-2">
                          <div className="flex flex-wrap gap-2 mb-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/10 dark:text-blue-400"
                            >
                              {question.subject}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 dark:bg-yellow-900/10 dark:text-yellow-400"
                            >
                              {question.type}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 hover:bg-green-50 dark:bg-green-900/10 dark:text-green-400"
                            >
                              {question.difficulty}
                            </Badge>
                          </div>

                          {question.type === "Multiple Choice" && (
                            <div className="space-y-1 text-sm text-muted-foreground ml-2">
                              {question.options.map((option, i) => (
                                <div key={i}>• {option}</div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="p-4 pt-2">
                          <Button
                            size="sm"
                            className="ml-auto"
                            onClick={() => addQuestion(question)}
                            disabled={selectedQuestions.some(
                              (q) => q.id === question.id
                            )}
                          >
                            {selectedQuestions.some(
                              (q) => q.id === question.id
                            ) ? (
                              "Added"
                            ) : (
                              <>
                                <Plus className="mr-1 h-3 w-3" />
                                Add to Test
                              </>
                            )}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}

                    {filteredQuestions.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">
                          No questions match your search criteria
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Test Paper Building */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Test Paper Preview</CardTitle>
                    <CardDescription>
                      {selectedQuestions.length} questions selected
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      Estimated time: {calculateEstimatedTime()} minutes
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {selectedQuestions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed border-muted-foreground/20 rounded-md">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Add questions from the question bank to build your test
                      paper
                    </p>
                  </div>
                ) : (
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="questions">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-4"
                        >
                          {selectedQuestions.map((question, index) => (
                            <Draggable
                              key={question.id}
                              draggableId={question.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="border rounded-md p-4 bg-background"
                                >
                                  <div className="flex items-start gap-2">
                                    <div
                                      {...provided.dragHandleProps}
                                      className="mt-1 cursor-grab"
                                    >
                                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-start justify-between mb-2">
                                        <div className="font-medium">
                                          {index + 1}. {question.question}
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 rounded-full"
                                          onClick={() =>
                                            removeQuestion(question.id)
                                          }
                                        >
                                          <X className="h-4 w-4" />
                                          <span className="sr-only">
                                            Remove
                                          </span>
                                        </Button>
                                      </div>
                                      <div className="flex flex-wrap gap-2 mb-1">
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {question.type}
                                        </Badge>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {question.difficulty}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Drag and drop to reorder questions
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedQuestions([])}
                  disabled={selectedQuestions.length === 0}
                >
                  Clear All
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="shuffle" />
                  <Label htmlFor="shuffle">
                    Shuffle question order for students
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="show-answers" />
                  <Label htmlFor="show-answers">
                    Show answers after submission
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="time-limit-enabled" defaultChecked />
                  <Label htmlFor="time-limit-enabled">Enable time limit</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="allow-retakes" />
                  <Label htmlFor="allow-retakes">Allow multiple attempts</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Access Control</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Who can access this test?</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All students</SelectItem>
                      <SelectItem value="specific">
                        Specific students/groups
                      </SelectItem>
                      <SelectItem value="private">Only me (private)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select defaultValue="always">
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Always available</SelectItem>
                      <SelectItem value="scheduled">
                        Scheduled availability
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
