from files.dao import FileDAO
from files.schemas import SFileAdd


async def csv_process(fileid, filename, path, file_byte):
    try:
        file_obj = SFileAdd(id=fileid, filename=filename, original_path=path)
        await FileDAO.add(**file_obj.model_dump())
        await FileDAO.change_status_by_id(fileid, 'processing')
        ...

        with open(path, 'wb') as file:
            file.write(file_byte)
        await FileDAO.change_status_by_id(fileid, 'done')
    except Exception as e:
        await FileDAO.change_status_by_id(fileid, 'error')
        raise e


async def json_process(fileid, filename, path, file_byte):
    try:
        file_obj = SFileAdd(id=fileid, filename=filename, original_path=path)
        await FileDAO.add(**file_obj.model_dump())
        await FileDAO.change_status_by_id(fileid, 'processing')
        ...

        with open(path, 'wb') as file:
            file.write(file_byte)
        await FileDAO.change_status_by_id(fileid, 'done')
    except Exception as e:
        await FileDAO.change_status_by_id(fileid, 'error')
        raise e


async def mp4_process(fileid, filename, path, file_byte):
    try:
        file_obj = SFileAdd(id=fileid, filename=filename, original_path=path)
        await FileDAO.add(**file_obj.model_dump())
        await FileDAO.change_status_by_id(fileid, 'processing')
        ...

        with open(path, 'wb') as file:
            file.write(file_byte)
        await FileDAO.change_status_by_id(fileid, 'done')
    except Exception as e:
        await FileDAO.change_status_by_id(fileid, 'error')
        raise e
