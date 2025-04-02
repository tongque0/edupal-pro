import uuid
from fastapi import APIRouter, Depends, HTTPException, Request, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.rabbitmq import send_question
from app.models import Question, QuestionTrace
from app.routes.question.question_schemas import QuestionFilter
from app.database import get_db

router = APIRouter()


@router.post("/gen", summary="题目生成")
async def gen_question(
    request: Request,
    subjects: List[str],
    grades: List[str],
    difficulties: List[str],
    types: List[str],
    knowledge_points: List[str],
    source_id: Optional[str] = Query(default=None, description="批次追踪ID，可选"),
):
    """
    根据学科、年级、难度、题型生成多个题目（异步执行）
    可传入 source_id，否则自动生成
    """
    user_id = request.state.user.get("id")
    print(f"用户ID: {user_id}")

    if not (len(subjects) == len(grades) == len(difficulties) == len(types) == len(knowledge_points)):
        raise HTTPException(
            status_code=400,
            detail="参数长度不一致，请确保 subjects、grades、difficulties、types、knowledge_points 长度一致",
        )

    # ✅ 如果没有传入 source_id，就自动生成一个
    if not source_id:
        source_id = str(uuid.uuid4())

    for i in range(len(subjects)):
        send_question(
            userid=user_id,
            subject=subjects[i],
            grade=grades[i],
            difficulty=difficulties[i],
            type_=types[i],
            knowledge_point=knowledge_points[i],
            source_id=source_id,
        )

    return {
        "message": f"{len(subjects)} 道题目生成请求已接收，正在后台生成题目。",
        "source_id": source_id,
    }


@router.get("/get", summary="获取题目")
def get_questions(filters: QuestionFilter, db: Session = Depends(get_db)):
    stmt = select(Question).where(Question.is_deleted == False)

    if filters.user_id is not None:
        stmt = stmt.where(Question.user_id == filters.user_id)
    if filters.subject:
        stmt = stmt.where(Question.subject == filters.subject)
    if filters.grade:
        stmt = stmt.where(Question.grade == filters.grade)
    if filters.difficulty:
        stmt = stmt.where(Question.difficulty == filters.difficulty)
    if filters.type:
        stmt = stmt.where(Question.type == filters.type)
    if filters.source_id:
        stmt = stmt.where(Question.source_id == filters.source_id)

    # ✅ 分页逻辑
    if filters.page > 0:
        offset = (filters.page - 1) * filters.page_size
        stmt = stmt.offset(offset).limit(filters.page_size)

    result = db.execute(stmt)
    return result.scalars().all()


@router.get("/trace/{source_id}", summary="获取指定批次追踪记录")
def get_question_trace(source_id: str, db: Session = Depends(get_db)):
    stmt = select(QuestionTrace).where(
        QuestionTrace.is_deleted == False,
        QuestionTrace.source_id == source_id,
    )
    result = db.execute(stmt)
    return result.scalars().all()
