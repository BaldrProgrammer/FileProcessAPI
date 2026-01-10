from fastapi import APIRouter, Depends, HTTPException
from folders.dao import FolderDAO
from folders.schemas import SFolderAdd, SFolderGet
from users.auth import current_user

from typing import Optional
import os

from users.schemas import SUserGet

router = APIRouter(prefix='/folders', tags=['/folders'])


@router.get('/info')
async def get_folder_info(filter_value: str, filter_type: str,
                          user: SUserGet = Depends(current_user)) -> SFolderGet | None:
    if filter_type == 'id':
        return await FolderDAO.find_by_id(int(filter_value))
    elif filter_type == 'name':
        path = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), filter_value)
        return await FolderDAO.find_one_or_none(path=path)
    return


@router.get('/items')
async def get_folder_content(filter_value: str, filter_type: str,
                          user: SUserGet = Depends(current_user)) -> dict | None:
    if filter_type == 'id':
        filter_value = (await FolderDAO.find_by_id(int(filter_value))).name
    path = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), filter_value)
    return {'ok': True, 'content': os.listdir(path)}


@router.post('/mkdir')
async def mkdir(folder_path: str, user: SUserGet = Depends(current_user)) -> dict:
    if (await FolderDAO.find_one_or_none(name=folder_path)) is None:
        path = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), folder_path)
        new_instance = SFolderAdd(name=folder_path, path=path)
        os.mkdir(path)
        check = await FolderDAO.add(**new_instance.model_dump())
        if check:
            return {'ok': True, 'name': folder_path, 'path': path}
        return {'ok': False, 'name': folder_path}
    raise HTTPException(status_code=409, detail="folder already exists")


@router.patch('/ren')
async def rendir(old_path: str, new_path: str, user: SUserGet = Depends(current_user)) -> dict:
    oldpath = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), old_path)
    newpath = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), new_path)
    os.rename(oldpath, newpath)
    await FolderDAO.update({'path': oldpath}, {'path': newpath})
    return {'ok': True, 'oldpath': oldpath, 'newpath': newpath}


@router.delete('/rmdir')
async def rmdir(folder_path: str, hard: Optional[bool], user: SUserGet = Depends(current_user)) -> dict:
    path = os.path.join(os.path.dirname(__file__), '../file_storage', str(user.id), folder_path)
    files_in_dir = os.listdir(path)
    if (not files_in_dir) or hard:
        for file in files_in_dir:
            os.remove(os.path.join(path, file))
    else:
        return {'ok': False, 'detail': 'folder is not empty'}
    os.rmdir(path)
    await FolderDAO.delete(path=path)
    return {'ok': True, 'name': folder_path, 'path': path}
