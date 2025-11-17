from sqlalchemy import select
from database import async_session_maker
from files.models import FileModel
import asyncio

class BaseDAO:
    model = None

    @classmethod
    async def find_all(cls, **filters):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filters)
            result = await session.execute(query)
            return result.scalars().all()


    @classmethod
    async def find_one_or_none(cls, **filters):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(**filters)
            result = await session.execute(query)
            return result.scalars().one_or_none()


    @classmethod
    async def find_by_id(cls, columnid: int):
        async with async_session_maker() as session:
            query = select(cls.model).filter_by(id=columnid)
            result = await session.execute(query)
            return result.scalars().all()


    async def add(cls, **values):
        async with async_session_maker() as session:
            new_instance = cls.model(**values)
            session.add(new_instance)
            try:
                await session.commit()
            except Exception as e:
                await session.rollback()
                raise e
            return new_instance
