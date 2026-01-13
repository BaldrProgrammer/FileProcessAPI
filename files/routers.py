import os
import random

import magic
from typing import List, Optional

from fastapi import APIRouter, UploadFile, Depends, HTTPException
from fastapi.responses import FileResponse, StreamingResponse

from files.dao import FileDAO
from files.schemas import SFileGet, SFileAdd
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
        filename = (folder + "/" if folder != "." else "") + uploaded_file.filename
        if (await FileDAO.find_one_or_none(filename=filename, owner_id=user.id)) is None:
            fileid = random.randint(1000000000, 2147483647)
            path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage",
                                    str(user.id), folder, uploaded_file.filename)
            file_byte = await uploaded_file.read()

            try:
                with open(path, 'wb') as file:
                    file.write(file_byte)
                extension = magic.from_file(path, mime=True)
                print(extension)

                exists = os.path.isdir('/'.join(path.split('/')[:-1]))
                if not exists:
                    os.mkdir('/'.join(path.split('/')[:-1]))

                file_obj = SFileAdd(id=fileid, filename=filename, path=path, extension=extension, owner_id=user.id)
                await FileDAO.add(**file_obj.model_dump())
                await FileDAO.change_status_by_id(fileid, 'processing')
                await FileDAO.change_status_by_id(fileid, 'done')

                file_ids.append(fileid)

            except Exception as e:
                await FileDAO.change_status_by_id(fileid, 'error')
                raise e
        else:
            raise HTTPException(status_code=409, detail=f"file already exists {uploaded_file.filename}")

    return {'ok': True, 'fileids': str(file_ids)}


@router.post("/touch")
async def file_touch(filepath: str, user: SUserGet = Depends(current_user)) -> dict:
    if (await FileDAO.find_one_or_none(filename=filepath, owner_id=user.id)) is None:
        fileid = random.randint(1000000000, 2147483647)
        path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage",
                                str(user.id), filepath)

        with open(path, 'x') as file:
            file.write("")
        extension = magic.from_file(path, mime=True)
        print(extension)

        exists = os.path.isdir('/'.join(path.split('/')[:-1]))
        if not exists:
            os.mkdir('/'.join(path.split('/')[:-1]))

        file_obj = SFileAdd(id=fileid, filename=filepath, path=path, extension=extension, owner_id=user.id)
        await FileDAO.add(**file_obj.model_dump())

        return {'ok': True,}
    raise HTTPException(status_code=409, detail="file already exists")


@router.patch('/ren')
async def ren(filter_value: str, filter_type: str, newname: str):
    if (await FileDAO.find_one_or_none(filename=newname)) is None:
        if filter_type == 'id':
            file_obj = await FileDAO.find_by_id(int(filter_value))
        elif filter_type == 'name':
            file_obj = await FileDAO.find_one_or_none(filename=filter_value)
        else:
            return

        filepath = file_obj.path.replace(file_obj.filename[1:], newname[1:])
        os.rename(file_obj.path, filepath)
        await FileDAO.rename(file_obj.id, newname, filepath)

        return {'ok': True, 'newpath': filepath}
    raise HTTPException(status_code=409, detail="file already exists")


@router.patch('/move')
async def move(filter_value: str, filter_type: str, newpath: str, user: SUserGet = Depends(current_user)):
    if filter_type == 'id':
        file_obj = await FileDAO.find_by_id(int(filter_value))
    elif filter_type == 'name':
        file_obj = await FileDAO.find_one_or_none(filename=filter_value)
    else:
        return

    filepath = os.path.join(os.path.abspath(os.path.dirname(__file__)), "../file_storage",
                            str(user.id), newpath)
    os.rename(file_obj.path, filepath)
    await FileDAO.update({'id': file_obj.id}, {'filename': newpath, 'path': filepath})

    return {'ok': True, 'newpath': filepath}


@router.delete("/remove")
async def delete_multiple(filter_values: List[str], filter_type: str) -> dict | None:
    file_ids_return = []
    for value in filter_values:
        if filter_type == 'id':
            file_obj = await FileDAO.find_by_id(int(value))
        elif filter_type == 'name':
            file_obj = await FileDAO.find_one_or_none(filename=value)
        else:
            return
        filedict = file_obj.to_dict()

        await FileDAO.delete(id=filedict['id'])
        os.remove(filedict['path'])
        file_ids_return.append(file_obj.id)
    return {'ok': True, 'fileid': str(file_ids_return)}
