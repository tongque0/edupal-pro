import os
from fastapi import FastAPI, Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import jwt
from app.utils.jwt_utils import decode_access_token
from app.utils.casbin_utils import get_enforcer
from jwt.exceptions import InvalidTokenError

def register_middlewares(app: FastAPI):
    # 注册 JWT 中间件
    print("register_middlewares")
    CorsMiddleware(app)
    app.add_middleware(AuthMiddleware)

def CorsMiddleware(app: FastAPI):
    origins = [
        "*",
    ]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,  # 允许的跨域来源
        allow_credentials=True,
        allow_methods=["*"],  # 允许的 HTTP 方法
        allow_headers=["*"],  # 允许的请求头
    )


class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):
        # 无需验证的路径
        if request.url.path in ["/ping", "/user/signin", "/user/signup", "/docs", "/openapi.json"]:
            return await call_next(request)

    # 1. 获取 Authorization Header
        token = request.headers.get("Authorization")
        if not token:
            return JSONResponse(status_code=401, content={"detail": "Token required"})
    # 2. 校验 JWT
        try:
            payload = decode_access_token(token)
            request.state.user = payload
        except jwt.ExpiredSignatureError:
            return JSONResponse(status_code=401, content={"detail": "Token expired"})
        except jwt.InvalidTokenError:
            return JSONResponse(status_code=401, content={"detail": "Token invalid"})
        except Exception as e:
            return JSONResponse(status_code=401, content={"detail": "Token invalid"})

     # 3. Casbin 权限控制
        enforcer = get_enforcer()
        path = request.url.path
        method = request.method
        role = payload.get("role")

        # 以 username 作为 subject，path 作为 object，method 作为 action
        # 如果没有权限，就返回 403
        if not enforcer.enforce(role, path, method):
            return JSONResponse(status_code=403, content={"detail": "权限不足"})

        # 4. 如果通过校验，继续调用下一个中间件或路由
        response = await call_next(request)
        return response
