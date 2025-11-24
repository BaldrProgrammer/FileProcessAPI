from fastapi import APIRouter, Depends
from users.dao import UserDAO
from users.schemas import SUserGet
from users.auth import current_user

router = APIRouter(prefix='/users', tags=['/users'])


@router.get('/')
async def get_all_users() -> list[SUserGet]:
    return await UserDAO.find_all()


@router.get('/current')
async def get_current_user(user: SUserGet = Depends(current_user)) -> SUserGet:
    return user


@router.get('/{user_id}')
async def get_user_by_id(user_id: int) -> SUserGet:
    return await UserDAO.find_by_id(user_id)
