import os
import magic
from files.dao import FileDAO
from files.schemas import SFileAdd


async def file_process(fileid, filename, path, file_byte):
    try:
        with open(path, 'wb') as file:
            file.write(file_byte)
        extension = magic.from_file(path, mime=True)
        print(extension)

        exists = os.path.isdir('/'.join(path.split('/')[:-1]))
        if not exists:
            os.mkdir('/'.join(path.split('/')[:-1]))

        file_obj = SFileAdd(id=fileid, filename=filename, path=path, extension=extension)
        await FileDAO.add(**file_obj.model_dump())
        await FileDAO.change_status_by_id(fileid, 'processing')
        await FileDAO.change_status_by_id(fileid, 'done')
        return True
    except Exception as e:
        await FileDAO.change_status_by_id(fileid, 'error')
        raise e
