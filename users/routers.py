from fastapi import APIRouter
from users.dao import UserDAO
from users.schemas import SUserGet

router = APIRouter(prefix='/users', tags=['/users'])


@router.get('/')
async def get_all_users() -> list[SUserGet]:
    return await UserDAO.find_all()
