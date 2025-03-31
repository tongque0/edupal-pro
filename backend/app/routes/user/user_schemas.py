from typing import Optional
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: Optional[str] = None

class UserAuth(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True
