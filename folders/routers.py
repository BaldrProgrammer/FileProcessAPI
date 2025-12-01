from fastapi import APIRouter, Depends
from folders.dao import FolderDAO
from folders.schemas import SFolderGet, SFolderAdd
from users.auth import current_user
import os

router = APIRouter(prefix='/folders', tags=['/folders'])


@router.post('/mkdir/{name}')
async def mkdir(name: str, user: SFolderGet = Depends(current_user)) -> dict:
    path = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), name)
    new_instance = SFolderAdd(name=name, path=path)
    os.mkdir(path)
    check = await FolderDAO.add(**new_instance.model_dump())
    if check:
        return {'ok': True, 'name': name, 'path': path}
    return {'ok': False, 'name': name}


@router.patch('/ren')
async def rmdir(old_name: str, new_name: str, user: SFolderGet = Depends(current_user)) -> dict:
    oldpath = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), old_name)
    newpath = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), new_name)
    os.rename(oldpath, newpath)
    await FolderDAO.update({'path': oldpath}, {'path': newpath})
    return {'ok': True, 'oldpath': oldpath, 'newpath': newpath}


@router.delete('/rmdir/{name}')
async def rmdir(name: str, user: SFolderGet = Depends(current_user)) -> dict:
    path = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), name)
    os.rmdir(path)
    await FolderDAO.delete(path=path)
    return {'ok': True, 'name': name, 'path': path}
