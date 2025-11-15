async def csv_process(filename, uploaded_file):
    try:
        status = 'processing'
        ...

        with open(filename, 'wb') as file:
            file.write(uploaded_file.file)
        status = 'done'
    except:
        status = 'error'


async def json_process(filename, uploaded_file):
    try:
        status = 'processing'
        ...

        with open(filename, 'wb') as file:
            file.write(uploaded_file.file)
        status = 'done'
    except:
        status = 'error'
