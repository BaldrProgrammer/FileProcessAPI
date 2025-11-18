from dao.base import BaseDAO
from database import async_session_maker
from files.models import FileModel

from sqlalchemy import update as update_sqlalchemy
from sqlalchemy.exc import SQLAlchemyError


class FileDAO(BaseDAO):
    model = FileModel

    @classmethod
    async def change_status_by_id(cls, uuid, new_status):
        async with async_session_maker() as session:
            query = (
                update_sqlalchemy(cls.model)
                .filter_by(uuid=uuid)
                .values(status=new_status)
                .execution_options(synchronize_session='fetch')
            )
            await session.execute(query)
            try:
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
            return True
