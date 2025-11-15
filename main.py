from fastapi import FastAPI, File, UploadFile

app = FastAPI()


@app.post("/uploadfile")
async def uploadfile(fileup: UploadFile):
    with open(fileup.filename, 'wb') as file:
        file.write(fileup.file.read())
