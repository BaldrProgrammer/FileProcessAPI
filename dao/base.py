from sqlalchemy import update as sqlalchemy_update
from sqlalchemy.future import select
from sqlalchemy.exc import SQLAlchemyError
from database import async_session_maker

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


    @classmethod
    async def add(cls, **values):
        async with async_session_maker() as session:
            new_instance = cls.model(**values)
            session.add(new_instance)
            try:
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
            return new_instance


    @classmethod
    async def update(cls, filter_by: dict, values: dict):
        async with async_session_maker() as session:
            query = (
                sqlalchemy_update(cls.model)
                .filter_by(**filter_by)
                .values(**values)
                .execution_options(synchronize_session='fetch')
            )
            await session.execute(query)
            try:
                await session.commit()
            except SQLAlchemyError as e:
                await session.rollback()
                raise e
            return True
