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
