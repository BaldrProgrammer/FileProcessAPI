from sqlalchemy.orm import Mapped, mapped_column
from database import Base


class UserModel(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    hashed_password: Mapped[str]
    is_admin: Mapped[bool]

    def __str__(self):
        return f'User(id={self.id};username={self.username})'

    def __repr__(self):
        return str(self)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'hashed_password': self.hashed_password,
            'is_admin': self.is_admin
        }
