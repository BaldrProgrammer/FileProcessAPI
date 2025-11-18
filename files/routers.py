import os.path
import random
import asyncio

from fastapi import APIRouter, UploadFile

from funcs import csv_process, json_process
from files.dao import FileDAO
from files.schemas import SFileGet

router = APIRouter()


@router.get("/files/get_info/{fileid}")
async def get_fileinfo(fileid: int) -> SFileGet:
    file_obj = await FileDAO.find_by_id(fileid)
    return file_obj


@router.post("/files/upload")
async def uploadfile(uploaded_file: UploadFile) -> dict:
    file_id = random.randint(0, 2147483647)
    file_extension = uploaded_file.filename.split('.')[-1]
    filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage", file_extension, str(file_id) + uploaded_file.filename)

    file_byte = await uploaded_file.read()

    if file_extension == 'csv':
        asyncio.create_task(csv_process(file_id, uploaded_file.filename, filepath, file_byte))
    elif file_extension == 'json':
        asyncio.create_task(json_process(file_id, uploaded_file.filename, file_byte))

    return {'fileid': file_id}
