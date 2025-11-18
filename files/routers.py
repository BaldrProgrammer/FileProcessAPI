import random
import asyncio

from fastapi import APIRouter, UploadFile

from funcs import csv_process, json_process

router = APIRouter()


@router.post("/uploadfile")
async def uploadfile(uploaded_file: UploadFile):
    file_id = random.randint(0, 2147483647)
    file_extension = uploaded_file.filename.split('.')[-1]
    filename = str(file_id) + file_extension

    if file_extension == 'csv':
        asyncio.create_task(csv_process(file_id, filename, uploaded_file))
    elif file_extension == 'json':
        asyncio.create_task(json_process(file_id, filename, uploaded_file))

    return {'fileid': file_id}
