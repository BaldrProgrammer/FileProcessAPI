from dao.base import BaseDAO
from users.models import UserModel


class UserDAO(BaseDAO):
    model = UserModel
