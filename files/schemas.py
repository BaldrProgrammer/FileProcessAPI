from pydantic import BaseModel, Field
from typing import Optional


class SFileGet(BaseModel):
    id: int
    filename: str = Field(..., description='имя файла')
    original_path: str = Field(..., description='путь к необ. файлу')
    result_path: Optional[str] = Field(None, description='путь к об. файлу')
    status: str = Field(..., description='статус обработки')
    stats: str = Field(..., description='стата файла')
    error: Optional[str] = Field(None, description='ошибка(если есть)')


class SFileAdd(BaseModel):
    id: int
    filename: str = Field(..., description='имя файла')
    original_path: str = Field(..., description='путь к необ. файлу')
