from sqlalchemy.orm import Mapped, mapped_column
from database import Base

from typing import Optional


class FileModel(Base):
    __tablename__ = 'files'

    id: Mapped[int] = mapped_column(primary_key=True)
    filename: Mapped[str]
    path: Mapped[str]
    extension: Mapped[str]
    owner_id: Mapped[int]
    status: Mapped[str] = mapped_column(default='pending')
    error: Mapped[Optional[str]] = mapped_column(None)

    def __str__(self):
        return f'File(id={self.id};filename={self.filename})'

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {
            'id': self.id,
            'filename': self.filename,
            'path': self.path,
            'status': self.status,
            'owner_id': self.owner_id,
            'error': self.error
        }
