import { useRef } from "react";
import { useAppSelector } from "@/modules/stores";
import type { RootState } from "@/modules/stores";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { QuestionDetail } from "./QuestionDialog";
import html2pdf from "html2pdf.js";

export interface TestPaperDetails {
  title: string;
  subject?: string;
  timeLimit?: number;
  grade?: string;
  description: string;
  instructions?: string;
  questions?: QuestionDetail[];
}

interface TestPaperProps {
  id?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: TestPaperDetails | null;
}

export function TestpaperDialog({ id, open, onOpenChange }: TestPaperProps) {
  const { questions, title, description, instructions } = useAppSelector(
    (state: RootState) => state.testpaper
  );

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    console.log("点击了下载按钮");
    if (contentRef.current) {
      const opt = {
        margin: 0.5,
        filename: `${title || "试卷"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf().set(opt).from(contentRef.current).save();
    } else {
      console.warn("contentRef is null");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl min-w-[900px] max-h-[800px] overflow-auto">
          <div ref={contentRef}>
            <DialogHeader>
              <DialogTitle>{title || "未命名试卷"}</DialogTitle>
              <DialogDescription>
                {description || "暂无描述。"}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-6">
              {instructions && (
                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">说明：</h3>
                  <p>{instructions}</p>
                </div>
              )}

              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div key={q.id} className="border-b pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium break-words">
                        {index + 1}. {q.question}
                      </h3>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-900/10 dark:text-blue-400"
                      >
                        {q.type}
                      </Badge>
                    </div>

                    {q.type === "选择题" && (
                      <div className="space-y-2 ml-6">
                        {["A", "B", "C", "D"].map((option, j) => (
                          <div key={j} className="flex items-center space-x-2">
                            <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                            <span>{option}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {q.type === "判断题" && (
                      <div className="space-y-2 ml-6">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                          <span>正确</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded-full border border-muted-foreground" />
                          <span>错误</span>
                        </div>
                      </div>
                    )}

                    {q.type === "计算题" && (
                      <div className="ml-6 mt-2">
                        <div className="border border-dashed border-muted-foreground p-2 rounded-md">
                          <p className="text-muted-foreground text-sm">
                            答题区域
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              下载 PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
