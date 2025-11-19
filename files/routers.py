import os.path
import random
import asyncio

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


@router.get('/get_file')
async def get_file(fileid: int) -> FileResponse:
    file_obj = await FileDAO.find_by_id(fileid)
    return FileResponse(file_obj.to_dict()['original_path'])


def iterfile(filepath: str):
    with open(filepath, 'rb') as file:
        while chunk := file.read(1024 * 1024):
            yield chunk


@router.get('/get_file_streaming')
async def get_file_streaming(fileid: int) -> StreamingResponse:
    file_obj = await FileDAO.find_by_id(fileid)
    filedict = file_obj.to_dict()
    if filedict['filename'].split('.')[-1] == 'mp4':
        return StreamingResponse(iterfile(filedict['original_path']), media_type=f'video/{filedict['filename'].split('.')[-1]}')
    return StreamingResponse(iterfile(filedict['original_path']), media_type=f'text/{filedict['filename'].split('.')[-1]}')


@router.post("/upload")
async def uploadfile(uploaded_file: UploadFile) -> dict:
    file_id = random.randint(0, 2147483647)
    file_extension = uploaded_file.filename.split('.')[-1]
    filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage", file_extension,
                            str(file_id) + uploaded_file.filename)

    file_byte = await uploaded_file.read()

    asyncio.create_task(file_process(file_id, uploaded_file.filename, filepath, file_byte))

    return {'fileid': file_id}
