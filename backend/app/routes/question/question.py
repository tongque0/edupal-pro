import uuid
from fastapi import APIRouter, Depends, HTTPException, Request, Query
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import select,func
from app.rabbitmq import send_question
from app.models import Question, QuestionTrace
from app.routes.question.question_schemas import QuestionFilter,  QuestionCRUD
from app.database import get_db
router = APIRouter()

# 题目生成相关
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
def get_questions(filters: QuestionFilter = Depends(), db: Session = Depends(get_db)):
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

    # 获取总数据条数
    count_stmt = select(func.count()).select_from(stmt.subquery())
    total_count = db.scalar(count_stmt)

    # ✅ 分页逻辑
    if filters.page > 0:
        offset = (filters.page - 1) * filters.page_size
        stmt = stmt.offset(offset).limit(filters.page_size)

    result = db.execute(stmt)
    data = result.scalars().all()

    return {
        "total_count": total_count,
        "data": data,
    }

@router.post("/new", summary="创建题目")
def create_question(
    request: Request,
    question: QuestionCRUD,
    db: Session = Depends(get_db),
):
    user_id = request.state.user.get("id")
    orm_question = Question(
        user_id=user_id,
        subject=question.subject,
        grade=question.grade,
        difficulty=question.difficulty,
        type=question.type,
        content=question.content,
        options=question.options,
        answer=question.answer,
        explanation=question.explanation,
        is_public=question.is_public,
        tag=question.tag,
        source_id=question.source_id or str(uuid.uuid4()),
        is_deleted=False,  # 如果你有这个字段
    )

    db.add(orm_question)
    db.commit()
    db.refresh(orm_question)

    return {
        "source_id": orm_question.source_id,
        "question": orm_question,
    }

@router.put("/update/{question_id}", summary="更新题目")
def update_question(
    request: Request,
    question_id: int,
    question: QuestionCRUD,
    db: Session = Depends(get_db),
):
    user_id = request.state.user.get("id")
    stmt = select(Question).where(
        Question.is_deleted == False,
        Question.id == question_id,
        Question.user_id == user_id,  # 只能更新自己的问题
    )
    result = db.execute(stmt)
    existing_question = result.scalar_one_or_none()

    if not existing_question:
        raise HTTPException(status_code=404, detail="题目不存在或无权限更新")

    # 更新题目信息
    for key, value in question.dict(exclude_unset=True).items():
        setattr(existing_question, key, value)

    db.commit()
    db.refresh(existing_question)

    return {
        "message": "题目更新成功",
        "question": existing_question,
    }

@router.delete("/delete/{question_id}", summary="删除题目")
def delete_question(
    request: Request,
    question_id: int,
    db: Session = Depends(get_db),
):
    user_id = request.state.user.get("id")
    stmt = select(Question).where(
        Question.is_deleted == False,
        Question.id == question_id,
        Question.user_id == user_id,  # 只能删除自己的问题
    )
    result = db.execute(stmt)
    question = result.scalar_one_or_none()

    if not question:
        raise HTTPException(status_code=404, detail="题目不存在或无权限删除")

    # 逻辑删除
    question.is_deleted = True
    db.commit()

    return {
        "message": "题目删除成功",
        "question_id": question_id,
    }

@router.delete("/delete_batch", summary="批量删除题目")
def delete_questions(
    request: Request,
    question_ids: List[int],
    db: Session = Depends(get_db),
):
    user_id = request.state.user.get("id")
    stmt = select(Question).where(
        Question.is_deleted == False,
        Question.id.in_(question_ids),
        Question.user_id == user_id,  # 只能删除自己的问题
    )
    result = db.execute(stmt)
    questions = result.scalars().all()

    if not questions:
        raise HTTPException(status_code=404, detail="题目不存在或无权限删除")

    # 批量逻辑删除
    for question in questions:
        question.is_deleted = True

    db.commit()

    return {
        "message": "题目批量删除成功",
        "question_ids": question_ids,
        "deleted_count": len(questions),
    }

@router.get("/trace/{source_id}", summary="获取指定批次追踪记录")
def get_question_trace(source_id: str, db: Session = Depends(get_db)):
    stmt = select(QuestionTrace).where(
        QuestionTrace.is_deleted == False,
        QuestionTrace.source_id == source_id,
    )
    result = db.execute(stmt)
    return result.scalars().all()

# 题目收藏相关
# @router.post("/collect", summary="收藏题目")
# def collect_question(
#     request: Request,
#     question_id: int,
#     db: Session = Depends(get_db),
# ):
#     user_id = request.state.user.get("id")
#     stmt = select(Question).where(
#         Question.is_deleted == False,
#         Question.id == question_id,
#     )
#     result = db.execute(stmt)
#     question = result.scalar_one_or_none()

#     if not question:
#         raise HTTPException(status_code=404, detail="题目不存在或无权限收藏")

#     # 收藏逻辑
#     question.is_collected = True
#     db.commit()

#     return {
#         "message": "题目收藏成功",
#         "question_id": question_id,
#     }
