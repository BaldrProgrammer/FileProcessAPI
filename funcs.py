from files.dao import FileDAO

async def csv_process(uuid, filename, uploaded_file):
    try:
        await FileDAO.change_status_by_id(uuid, 'processing')
        ...

        with open(filename, 'wb') as file:
            file.write(uploaded_file.file)
        await FileDAO.change_status_by_id(uuid, 'done')
    except Exception as e:
        await FileDAO.change_status_by_id(uuid, 'error')


async def json_process(uuid, filename, uploaded_file):
    try:
        await FileDAO.change_status_by_id(uuid, 'processing')
        ...

        with open(filename, 'wb') as file:
            file.write(uploaded_file.file)
        await FileDAO.change_status_by_id(uuid, 'done')
    except Exception as e:
        await FileDAO.change_status_by_id(uuid, 'error')

