import uuid
import pika
import json
from fastapi import APIRouter, Depends,  HTTPException,Request
from typing import List
from app.database import get_db
from app.rabbitmq import send_question
router = APIRouter()

@router.post("/gen", summary="题目生成")
async def gen_question(
    request: Request,
    subjects: List[str],
    grades: List[str],
    difficulties: List[str],
    types: List[str],
    knowledge_points: List[str],
    db=Depends(get_db),
):
    """
    根据学科、年级、难度、题型生成多个题目（异步执行）
    """
    user_id = request.state.user.get("id")
    print(f"用户ID: {user_id}")
    if not (len(subjects) == len(grades) == len(difficulties) == len(types) == len(knowledge_points)):
        raise HTTPException(status_code=400, detail="参数长度不一致，请确保 subjects、grades、difficulties、types、knowledge_points 长度一致")

    # ✅ 生成唯一的 source_id，用于追踪本批次生成任务
    source_id = str(uuid.uuid4())

    for i in range(len(subjects)):
        send_question(
            userid=user_id,
            subject=subjects[i],
            grade=grades[i],
            difficulty=difficulties[i],
            type_=types[i],
            knowledge_point=knowledge_points[i],
            source_id=source_id
        )

    return {
        "message": f"{len(subjects)} 道题目生成请求已接收，正在后台生成题目。",
        "source_id": source_id
    }
