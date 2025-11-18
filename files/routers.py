import os.path
import random
import asyncio

from fastapi import APIRouter, UploadFile

from funcs import csv_process, json_process

router = APIRouter()


@router.post("/uploadfile")
async def uploadfile(uploaded_file: UploadFile):
    file_id = random.randint(0, 2147483647)
    file_extension = uploaded_file.filename.split('.')[-1]
    filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage", file_extension, str(file_id) + uploaded_file.filename)
    filename = filepath

    file_byte = await uploaded_file.read()

    if file_extension == 'csv':
        asyncio.create_task(csv_process(file_id, filename, filepath, file_byte))
    elif file_extension == 'json':
        asyncio.create_task(json_process(file_id, filename, file_byte))

    return {'fileid': file_id}
