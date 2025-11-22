from pydantic import BaseModel, Field


class SUserGet(BaseModel):
    id: int
    username: str = Field(..., description='имя пользователя')
    hashed_password: str = Field(..., description='пароль')
    is_admin: bool = Field(..., description='админка')


class SUserAdd(BaseModel):
    id: int
    username: str = Field(..., description='имя пользователя')
    hashed_password: str = Field(..., description='пароль')
    is_admin: bool = Field(..., description='админка')
