from fastapi import APIRouter, Depends
from folders.dao import FolderDAO
from folders.schemas import SFolderGet, SFolderAdd
from users.auth import current_user
import os


router = APIRouter(prefix='/folders', tags=['/folders'])


@router.post('/mkdir')
async def mkdir(name: str, user: SFolderGet = Depends(current_user)) -> dict:
    path = os.path.join(os.path.dirname(__file__))
    print(path)
    new_instance = SFolderAdd(name=name, path='')
    return {}
