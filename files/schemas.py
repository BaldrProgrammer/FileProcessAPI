from pydantic import BaseModel, Field
from typing import Optional


class SFileGet(BaseModel):
    id: int
    filename: str = Field(..., description='имя файла')
    path: str = Field(..., description='путь к необ. файлу')
    extension: str = Field(..., description='расширение файла')
    owner_id: int = Field(..., description='владелец файла')
    status: str = Field(..., description='статус обработки')
    error: Optional[str] = Field(None, description='ошибка(если есть)')


class SFileAdd(BaseModel):
    id: int
    filename: str = Field(..., description='имя файла')
    path: str = Field(..., description='путь к необ. файлу')
    extension: str = Field(..., description='расширение файла')
    owner_id: int = Field(..., description='владелец файла')
