import uuid
import asyncio

from fastapi import APIRouter, UploadFile

from funcs import csv_process, json_process

router = APIRouter()


@router.post("/uploadfile")
async def uploadfile(uploaded_file: UploadFile):
    file_uuid = str(uuid.uuid4().int)
    file_extension = uploaded_file.filename.split('.')[-1]
    filename = file_uuid + file_extension

    if file_extension == 'csv':
        asyncio.create_task(csv_process(file_uuid, filename, uploaded_file))
    elif file_extension == 'json':
        asyncio.create_task(json_process(file_uuid, filename, uploaded_file))

    return {'uuid': file_uuid}
