import os
from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.orm import sessionmaker
from app import models  # 这里导入你的模型
from app.models import User  # 假设 User 是你在模型中定义的用户模型
from sqlalchemy.orm import Session as SQLAlchemySession
from passlib.context import CryptContext

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://edupal:edupal@edupal_mysql_dev:3306/edupal")
# 创建 SQLAlchemy 引擎
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# 创建数据库表并检查用户表，如果没有足够条目则创建 admin 用户
def create_db():
    # 创建所有表
    SQLModel.metadata.create_all(bind=engine)  # type: ignore

    # 检查是否有足够的用户，如果用户数量不够，则创建默认 admin 用户
    with SessionLocal() as db:
        user_count = db.query(User).count()

        # 如果用户数量小于2，则创建一个 admin 用户
        if user_count < 1:
            admin_user = User(
                username="admin",
                password=pwd_context.hash("123456"),
                role="admin",
                profile=""
            )
            db.add(admin_user)
            db.commit()
            print("Admin user created with username: admin and password: 123456")

# 获取数据库会话
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
