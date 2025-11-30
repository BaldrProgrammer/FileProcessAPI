from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class FolderModel(Base):
    __tablename__ = 'folders'

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    path: Mapped[str]
    stats: Mapped[str] = mapped_column(default='{}')

    def __str__(self):
        return f'Folder(id={self.id};name={self.name})'

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'path': self.path,
            'stats': self.stats,
        }
