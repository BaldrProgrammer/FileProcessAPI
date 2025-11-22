from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timezone, timedelta

from settings import get_token_data

pwd_context = CryptContext(schemes=['bcrypt'])


async def get_hash_password(password: str):
    return pwd_context.hash(password)


async def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)


async def jwt_encode(data: dict):
    to_encode = data.copy()
    expire_date = datetime.now(timezone.utc) + timedelta(days=30)
    to_encode.update({'exp': expire_date})
    auth_data = get_token_data()
    return jwt.encode(data, key=auth_data['key'], algorithm=auth_data['algorithm'])


async def jwt_decode(token: str):
    auth_data = get_token_data()
    return jwt.decode(token, key=auth_data['key'])
