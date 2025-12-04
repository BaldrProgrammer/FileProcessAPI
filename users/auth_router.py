from fastapi import APIRouter, Response, HTTPException, status
from users.dao import UserDAO
from users.schemas import SUserReg, SUserAuth
from users.auth import get_hash_password, verify_password, jwt_encode

router = APIRouter(prefix='/auth', tags=['/auth'])


@router.post('/register')
async def register(user: SUserReg):
    if await UserDAO.find_one_or_none(username=user.username):
        return HTTPException(
            status.HTTP_409_CONFLICT,
            'пользователь уже существует'
        )

    user.hashed_password = await get_hash_password(user.hashed_password)
    check = await UserDAO.add(**user.model_dump())
    if check:
        return {'ok': True}
    return {'ok': False}


@router.post('/log')
async def login(response: Response, auth_data: SUserAuth):
    user = await UserDAO.find_one_or_none(username=auth_data.username)
    if not user:
        return HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            'не правильный логин или пароль'
        )

    if await verify_password(auth_data.password, user.hashed_password):
        token = await jwt_encode({'user_id': user.id})
        response.set_cookie('access_token', token, httponly=True)
        return {'ok': True, 'access_token': token}
    else:
        return HTTPException(
            status.HTTP_401_UNAUTHORIZED,
            'не правильный логин или пароль'
        )


@router.post('/logout')
async def logout(response: Response):
    response.delete_cookie('access_token')
    return {'ok': True}
