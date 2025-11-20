import os
import random
from typing import List

from fastapi import APIRouter, UploadFile
from fastapi.responses import FileResponse, StreamingResponse

from funcs import file_process
from files.dao import FileDAO
from files.schemas import SFileGet

router = APIRouter(prefix='/files')


@router.get("/get_info/{fileid}")
async def get_fileinfo(fileid: int) -> SFileGet:
    file_obj = await FileDAO.find_by_id(fileid)
    return file_obj


@router.get('/get_file/{fileid}')
async def get_file(fileid: int) -> FileResponse:
    file_obj = await FileDAO.find_by_id(fileid)
    return FileResponse(file_obj.to_dict()['path'])


@router.get('/get_file_streaming/{fileid}')
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


@router.post("/upload")
async def uploadfile(uploaded_file: UploadFile) -> dict:
    file_id = random.randint(0, 2147483647)
    filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage",
                            str(file_id) + uploaded_file.filename)
    file_byte = await uploaded_file.read()

    ok = await file_process(file_id, uploaded_file.filename, filepath, file_byte)
    if ok:
        return {'ok': True, 'fileid': file_id}
    return {'ok': False}


@router.post("/upload_multiple")
async def upload_multiple_file(uploaded_files: List[UploadFile]) -> dict:
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


@router.delete("/delete/{fileid}")
async def deletefile(fileid: int) -> dict:
    file_obj = await FileDAO.find_by_id(fileid)
    filedict = file_obj.to_dict()

    await FileDAO.delete(id=filedict['id'])
    os.remove(filedict['path'])
    return {'ok': True, 'fileid': fileid}


@router.delete("/delete/multiple/{fileids}")
async def deletefile(fileids: str) -> dict:
    file_ids_return = []
    ids = fileids.split(',')
    for fileid in ids:
        file_obj = await FileDAO.find_by_id(int(fileid))
        filedict = file_obj.to_dict()

        await FileDAO.delete(id=filedict['id'])
        os.remove(filedict['path'])
        file_ids_return.append(fileid)
    return {'ok': True, 'fileid': str(file_ids_return)}
