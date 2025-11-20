import os
import random
from typing import List

from fastapi import APIRouter, UploadFile
from fastapi.responses import FileResponse, StreamingResponse

from funcs import file_process
from files.dao import FileDAO
from files.schemas import SFileGet

router = APIRouter(prefix='/files')


@router.get("/{fileid}/info")
async def get_fileinfo(fileid: int) -> SFileGet:
    file_obj = await FileDAO.find_by_id(fileid)
    return file_obj


@router.get('/{fileid}/content')
async def get_file(fileid: int) -> FileResponse:
    file_obj = await FileDAO.find_by_id(fileid)
    return FileResponse(file_obj.to_dict()['path'])


@router.get('/{fileid}/stream')
async def get_file_streaming(fileid: int) -> StreamingResponse:
    def iterfile(filepath: str):
        with open(filepath, 'rb') as file:
            while chunk := file.read(1024 * 1024):
                yield chunk

    file_obj = await FileDAO.find_by_id(fileid)
    filedict = file_obj.to_dict()
    if filedict['filename'].split('.')[-1] == 'mp4':
        return StreamingResponse(iterfile(filedict['path']),
                                 media_type=f'video/{filedict['filename'].split('.')[-1]}')
    return StreamingResponse(iterfile(filedict['path']),
                             media_type=f'text/{filedict['filename'].split('.')[-1]}')


@router.post("/")
async def upload_file(uploaded_files: List[UploadFile]) -> dict:
    file_ids = []
    for uploaded_file in uploaded_files:
        file_id = random.randint(0, 2147483647)
        filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage",
                                str(file_id) + uploaded_file.filename)
        file_byte = await uploaded_file.read()

        ok = await file_process(file_id, uploaded_file.filename, filepath, file_byte)
        if not ok:
            return {'ok': False}
        file_ids.append(file_id)

    return {'ok': True, 'fileids': str(file_ids)}

@router.delete("/{fileids}")
async def delete_multiple(fileid: List[str]) -> dict:
    file_ids_return = []
    for fid in fileid:
        file_obj = await FileDAO.find_by_id(int(fid))
        filedict = file_obj.to_dict()

        await FileDAO.delete(id=filedict['id'])
        os.remove(filedict['path'])
        file_ids_return.append(fid)
    return {'ok': True, 'fileid': str(file_ids_return)}
