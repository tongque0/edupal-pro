from pydantic import BaseModel
from typing import Optional

# 请求体模型：用于生成题目的参数
class QuestionCreate(BaseModel):
    subject: str
    grade: str
    difficulty: str
    type: str  # 题型：选择题、填空题、简答题等

# 响应体模型：返回的题目信息
class QuestionResponse(BaseModel):
    id: int
    subject: str
    grade: str
    difficulty: str
    type: str
    content: str
    answer: str
    options: Optional[str] = None  # 适用于选择题，存储JSON
    explanation: Optional[str] = None

    class Config:
        orm_mode = True  # 用于SQLAlchemy模型与Pydantic模型的兼容
