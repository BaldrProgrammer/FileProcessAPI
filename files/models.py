from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class FileModel(Base):
    __tablename__ = 'files'

    uuid: Mapped[int] = mapped_column(primary_key=True)
    filename: Mapped[str] = mapped_column(nullable=False)
    original_path: Mapped[str] = mapped_column(nullable=False)
    result_path: Mapped[str] = mapped_column(nullable=False)
    stats: Mapped[str] = mapped_column(nullable=False)
    error: Mapped[str] = mapped_column(nullable=True)

    def __str__(self):
        return f'File(uuid={self.uuid};filename={self.filename})'

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {
            'uuid': self.uuid,
            'filename': self.filename,
            'original_path': self.original_path,
            'result_path': self.result_path,
            'status': self.stats,
            'error': self.error
        }
