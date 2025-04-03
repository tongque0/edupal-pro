import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label"; // Ensure Label is imported from the correct path

// Define aiOptions with questionTypes

interface QuestionTypeControlProps {
  type:string ;
  label: string;
  count: number;
  enabled: boolean;
  onToggle: (type: string) => void;
  onCountChange: (
    type: string,
    count: string
  ) => void;
  maxCount: number;
}

const QuestionTypeControl: React.FC<QuestionTypeControlProps> = ({
  type,
  label,
  count,
  enabled,
  onToggle,
  onCountChange,
  maxCount,
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <Switch
        id={type}
        checked={enabled}
        onCheckedChange={() => onToggle(type)}
      />
      <Label htmlFor={type} className="font-normal">
        {label}
      </Label>
    </div>
    <div className="flex items-center gap-2">
      <Label htmlFor={`${type}-count`} className="text-sm">
        数量：
      </Label>
      <Input
        id={`${type}-count`}
        type="number"
        min="1"
        max={maxCount}
        className="w-16 h-8"
        value={count}
        onChange={(e) => onCountChange(type, e.target.value)}
        disabled={!enabled}
      />
    </div>
  </div>
);

export default QuestionTypeControl;
