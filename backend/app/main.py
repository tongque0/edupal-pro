from fastapi import FastAPI
from app.routes.user import user
from app.routes.question import question
from app.database import create_db
from app.middlewares import register_middlewares  # 引入你创建的注册函数

app = FastAPI(Debug=True)


# 在应用启动时创建数据库表
@app.on_event("startup")
def on_startup():
    create_db()

register_middlewares(app)

@app.get("/ping")
def ping():
    return {"Ping FastApi": "Pong FastApi"}

# 注册各个模块的路由
app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(question.router, prefix="/question", tags=["question"])
# app.include_router(papers.router, prefix="/papers", tags=["papers"])
# app.include_router(student_answers.router, prefix="/student_answers", tags=["student_answers"])



