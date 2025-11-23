from fastapi import APIRouter
from users.dao import UserDAO
from users.schemas import SUserReg

router = APIRouter(prefix='auth')


@router.post('/register')
async def user_register(user: SUserReg) -> dict:
    check = await UserDAO.add(**user.model_dump())
    if check:
        return {'ok': True}
    return {'ok': False}
