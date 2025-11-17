from pydantic import BaseModel, Field


class SFileGet(BaseModel):
    uuid: int
    filename: str = Field(..., description='имя файла')
    original_path: str = Field(..., description='путь к необ. файлу')
    result_path: str = Field(..., description='путь к об. файлу')
    stats: str = Field(..., description='стата файла')
    error: str = Field(..., description='ошибка(если есть)')
