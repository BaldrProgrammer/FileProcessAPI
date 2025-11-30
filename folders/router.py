from fastapi import APIRouter
from folders.dao import FolderDAO
from folders.schemas import SFolderAdd


router = APIRouter(prefix='/folders', tags=['/folders'])
