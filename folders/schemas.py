from pydantic import BaseModel, Field


class SFolderGet(BaseModel):
    id: int
    name: str = Field(..., description='имя папки')
    path: str = Field(..., description='путь к папке')
    stats: str = Field(..., description='стата папки')
    owner_id: int = Field(..., description='владелец папки')


class SFolderAdd(BaseModel):
    name: str = Field(..., description='имя папки')
    path: str = Field(..., description='путь к папке')
    owner_id: int = Field(..., description='владелец папки')
