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
        raise e
        await FileDAO.change_status_by_id(fileid, 'error')


async def json_process(uuid, filename, uploaded_file):
    try:
        await FileDAO.change_status_by_id(uuid, 'processing')
        ...

        with open(filename, 'wb') as file:
            file.write(uploaded_file.file)
        await FileDAO.change_status_by_id(uuid, 'done')
    except Exception as e:
        await FileDAO.change_status_by_id(uuid, 'error')

