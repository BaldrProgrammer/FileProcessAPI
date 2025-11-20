from files.dao import FileDAO
from files.schemas import SFileAdd


async def file_process(fileid, filename, path, file_byte):
    try:
        extension = filename.split('.')[-1]
        if extension in ['txt', 'json', 'csv']:
            extension = 'text/' + extension
        elif extension in ['mp3']:
            extension = 'audio/' + extension
        elif extension in ['mp4']:
            extension = 'video/' + extension
        else:
            return

        file_obj = SFileAdd(id=fileid, filename=filename, path=path, extension=extension)
        await FileDAO.add(**file_obj.model_dump())
        await FileDAO.change_status_by_id(fileid, 'processing')
        with open(path, 'wb') as file:
            file.write(file_byte)
        await FileDAO.change_status_by_id(fileid, 'done')
        return True
    except Exception as e:
        await FileDAO.change_status_by_id(fileid, 'error')
        raise e
