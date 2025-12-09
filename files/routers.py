import os
import random
from typing import List, Optional

from fastapi import APIRouter, UploadFile, Depends
from fastapi.responses import FileResponse, StreamingResponse

from funcs import file_process
from files.dao import FileDAO
from files.schemas import SFileGet
from users.schemas import SUserGet
from users.auth import current_user

router = APIRouter(prefix='/files', tags=['/files'])


@router.get("/info")
async def get_fileinfo(filter_value: str, filter_type: str) -> SFileGet | None:
    if filter_type == 'id':
        file_obj = await FileDAO.find_by_id(int(filter_value))
    elif filter_type == 'name':
        file_obj = await FileDAO.find_one_or_none(filename=filter_value)
    else:
        return
    return file_obj


@router.get('/content', response_model=None)
async def get_file(filter_value: str, filter_type: str) -> FileResponse | None:
    if filter_type == 'id':
        file_obj = await FileDAO.find_by_id(int(filter_value))
    elif filter_type == 'name':
        file_obj = await FileDAO.find_one_or_none(filename=filter_value)
    else:
        return
    return FileResponse(file_obj.to_dict()['path'])


@router.get('/stream', response_model=None)
async def get_file_streaming(filter_value: str, filter_type: str) -> StreamingResponse | None:
    def iterfile(filepath: str):
        with open(filepath, 'rb') as file:
            while chunk := file.read(1024 * 1024):
                yield chunk

    if filter_type == 'id':
        file_obj = await FileDAO.find_by_id(int(filter_value))
    elif filter_type == 'name':
        file_obj = await FileDAO.find_one_or_none(filename=filter_value)
    else:
        return

    return StreamingResponse(iterfile(file_obj.path), media_type=file_obj.extension)


@router.post("/")
async def upload_file(uploaded_files: List[UploadFile], folder: str, user: SUserGet = Depends(current_user)) -> dict:
    file_ids = []
    for uploaded_file in uploaded_files:
        file_id = random.randint(1000000000, 2147483647)
        filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage",
                                str(user.id), folder, str(file_id) + uploaded_file.filename)
        file_byte = await uploaded_file.read()

        ok = await file_process(file_id, uploaded_file.filename, filepath, file_byte)
        if not ok:
            return {'ok': False}
        file_ids.append(file_id)

    return {'ok': True, 'fileids': str(file_ids)}


@router.patch('/ren')
async def ren(fileid: int, newname: str):
    file = await FileDAO.find_by_id(fileid)
    filepath = file.path.replace(str(file.id) + file.filename, str(file.id) + newname)
    os.rename(file.path, filepath)
    await FileDAO.rename(fileid, newname, filepath)

    return {'ok': True, 'newpath': filepath}


@router.patch('/move')
async def move(fileid: int, newpath: Optional[str], user: SUserGet = Depends(current_user)):
    file = await FileDAO.find_by_id(fileid)
    filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage",
                            str(user.id), newpath, str(file.id) + file.filename)
    os.rename(file.path, filepath)
    await FileDAO.update({'id': fileid}, {'path': filepath})

    return {'ok': True, 'newpath': filepath}


@router.delete("/")
async def delete_multiple(fileid: List[str]) -> dict:
    file_ids_return = []
    for fid in fileid:
        file_obj = await FileDAO.find_by_id(int(fid))
        filedict = file_obj.to_dict()

        await FileDAO.delete(id=filedict['id'])
        os.remove(filedict['path'])
        file_ids_return.append(fid)
    return {'ok': True, 'fileid': str(file_ids_return)}
