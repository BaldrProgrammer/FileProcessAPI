from pydantic import BaseModel, Field


class SUserGet(BaseModel):
    id: int
    username: str = Field(..., description='имя пользователя')
    password: str = Field(..., description='пароль')
    is_admin: str = Field(..., description='админка')
