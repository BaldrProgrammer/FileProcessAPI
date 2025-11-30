from dao.base import BaseDAO
from folders.models import FolderModel


class FolderDAO(BaseDAO):
    model = FolderModel
