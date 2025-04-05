from pydantic import BaseModel, Field  # ✅ 正确导入 Field
from typing import Optional
from datetime import datetime

class QuestionRead(BaseModel):
    id: int
    user_id: Optional[int]
    subject: str
    grade: str
    difficulty: str
    type: str
    content: str
    options: Optional[str]
    answer: str
    explanation: Optional[str]
    is_public: bool
    tag: Optional[str]
    source_id: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True  # 必须加，支持从 SQLModel 转换

class QuestionFilter(BaseModel):
    user_id: Optional[int] = None
    subject: Optional[str] = None
    grade: Optional[str] = None
    difficulty: Optional[str] = None
    type: Optional[str] = None
    source_id: Optional[str] = None

    page: int = Field(default=-1, description="页码（默认 -1 表示不分页）")
    page_size: int = Field(default=10, ge=1, le=100, description="每页数量（仅分页时有效）")

class QuestionCRUD(BaseModel):
    subject: str
    grade: str
    difficulty: str
    type: str
    content: str
    options: Optional[str] = None
    answer: Optional[str] = None
    explanation: Optional[str] = None
    is_public: bool = Field(default=True)
    tag: Optional[str] = None
    source_id: Optional[str] = None
