from app.routes.user.user_schemas import UserResponse,UserAuth
from fastapi import APIRouter, Depends, HTTPException, status,Request
from sqlalchemy.orm import Session
from app.models import User
from app.utils.jwt_utils import create_access_token
from app.database import get_db
from passlib.context import CryptContext

router = APIRouter()


# 密码加密
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 加密密码
def get_password_hash(password: str):
    return pwd_context.hash(password)

# 验证密码
def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/signup", response_model=UserResponse,summary="用户注册")
def create_new_user(user: UserAuth, db: Session = Depends(get_db)):
    """
    用户注册
    """
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    # 使用加密密码
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, password=hashed_password, role="user")
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/signin", summary="用户登录")
def login_for_access_token(user: UserAuth, db: Session = Depends(get_db)):
    """
    用户登录，返回 JWT token
    """
    # 根据用户名或邮箱查询用户
    db_user = db.query(User).filter(
        (User.username == user.username)
    ).first()

    if db_user and verify_password(user.password, db_user.password):  # 使用加密密码验证
        token = create_access_token(data={"sub": db_user.username, "role": db_user.role, "id": db_user.id})
        return {"access_token": token, "token_type": "bearer"}

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
    )

@router.get("/me", response_model=UserResponse,summary="获取个人信息")
def read_users_me(request:Request,db: Session = Depends(get_db)):
    userid = request.state.user.get("id")
    if userid:
        db_user = db.query(User).filter(User.id == userid).first()
        if db_user:
            return db_user
    raise HTTPException(status_code=404, detail="User not found")

