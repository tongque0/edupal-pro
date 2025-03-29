from datetime import datetime, timezone
from sqlmodel import SQLModel, Field
from typing import Optional

def soft_delete(obj):
    obj.is_deleted = True
    obj.deleted_at = datetime.now(timezone.utc)

class TimestampMixin(SQLModel):
    created_at: datetime = Field(default_factory=datetime.utcnow, description="创建时间")
    updated_at: Optional[datetime] = Field(default=None, description="更新时间")
    is_deleted: bool = Field(default=False, description="是否逻辑删除")
    deleted_at: Optional[datetime] = Field(default=None, description="删除时间")

# 用户表
class User(TimestampMixin, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    password: str
    role: str  # 'teacher' or 'student'
    profile: Optional[str] = None

# 题目表
class Question(TimestampMixin, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = None
    subject: str
    grade: str
    difficulty: str
    type: str
    content: str
    options: Optional[str] = None
    answer: str
    explanation: Optional[str] = None
    is_public: bool = Field(default=True)
    tag: Optional[str] = None
    source_id: Optional[str] = None

# 题目追踪表
class QuestionTrace(TimestampMixin, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    question_id: int
    source: str = Field(default="ai")
    model: Optional[str] = Field(default="gpt-4o-mini")
    source_id: Optional[str] = None

# 做题记录表
class UserAnswer(TimestampMixin, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    question_id: int
    is_correct: bool
    time_spent: float

# 试卷表
class Paper(TimestampMixin, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    subject: str
    grade: str
    difficulty: str
    created_by: int

# 试卷与题目关系表
class PaperQuestion(TimestampMixin, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    paper_id: int
    question_id: int
    order: int
    score: float

# 学生答题记录表
class StudentPaperAnswer(TimestampMixin, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int
    paper_id: int
    question_id: int
    answer: str
    is_correct: bool
    time_spent: float
