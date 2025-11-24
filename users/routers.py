from fastapi import APIRouter, Response, Request
from users.dao import UserDAO
from users.schemas import SUserGet
from users.auth import jwt_decode

router = APIRouter(prefix='/users', tags=['/users'])


@router.get('/')
async def get_all_users() -> list[SUserGet]:
    return await UserDAO.find_all()


@router.get('/current')
async def get_current_user(response: Request):
    token = response.cookies.get('access_token')
    user_id = (await jwt_decode(token))['user_id']
    return await UserDAO.find_by_id(user_id)


@router.get('/{user_id}')
async def get_user_by_id(user_id: int) -> SUserGet:
    return await UserDAO.find_by_id(user_id)
