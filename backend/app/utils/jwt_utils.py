import os
import jwt
from datetime import datetime, timedelta, timezone
from typing import Optional
from fastapi import HTTPException
SECRET_KEY = os.getenv("SECRET_KEY", "default")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = os.getenv("EXPIRE_DAYS", "default")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """
    创建 JWT Token
    """
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=float(ACCESS_TOKEN_EXPIRE))
    to_encode = data.copy()
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    """
    验证并解析 JWT Token
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token 已过期")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="无效的凭证")
    except Exception as e:
        raise HTTPException(status_code=401, detail="无效的凭证")
