from dao.base import BaseDAO
from files.models import FileModel


class FileDAO(BaseDAO):
    model = FileModel
