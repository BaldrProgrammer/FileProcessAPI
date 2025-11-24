from fastapi import APIRouter
from users.dao import UserDAO
from users.schemas import SUserGet

router = APIRouter(prefix='/users', tags=['/users'])


@router.get('/')
async def get_all_users() -> list[SUserGet]:
    return await UserDAO.find_all()


@router.get('/{user_id}')
async def get_user_by_id(user_id: int) -> SUserGet:
    return await UserDAO.find_by_id(user_id)
