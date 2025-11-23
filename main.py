from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from files.routers import router as files_router
from users.auth_router import router as auth_router

app = FastAPI()

app.include_router(files_router)
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins = ['*'],
    allow_methods = ['*'],
    allow_headers = ['*']
)
