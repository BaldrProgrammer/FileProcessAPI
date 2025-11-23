from fastapi import APIRouter
from users.dao import UserDAO
from users.schemas import SUserReg, SUserAuth

router = APIRouter(prefix='/auth')


@router.post('/register')
async def register(user: SUserReg) -> dict:
    check = await UserDAO.add(**user.model_dump())
    if check:
        return {'ok': True}
    return {'ok': False}


@router.post('/log')
async def login(auth_data: SUserAuth):
    user = await UserDAO.find_one_or_none(username=auth_data.username)
    if user:
        return user
