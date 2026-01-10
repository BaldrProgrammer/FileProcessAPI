from fastapi import APIRouter, Depends
from users.dao import UserDAO
from users.schemas import SUserGet
from users.auth import current_user
import os

router = APIRouter(prefix='/users', tags=['/users'])


@router.get('/')
async def get_all_users() -> list[SUserGet]:
    return await UserDAO.find_all()


@router.get('/current')
async def get_current_user(user: SUserGet = Depends(current_user)) -> SUserGet:
    return user


@router.get('/files')
async def get_user_files(user: SUserGet = Depends(current_user)):
    filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)),
                            "../file_storage", str(user.id))
    files = []
    folders = []
    for obj in os.listdir(filepath):
        (files if '.' in obj else folders).append(obj)

    objects = sorted(folders) + sorted(files)
    return objects


@router.get('/{user_id}')
async def get_user_by_id(user_id: int) -> SUserGet:
    return await UserDAO.find_by_id(user_id)
