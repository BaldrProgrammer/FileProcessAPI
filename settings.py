from pydantic_settings.main import BaseSettings, SettingsConfigDict
import os


class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: str
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str
    KEY: str
    ALGORITHM: str

    model_config = SettingsConfigDict(
        env_file=os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env'),
    )


settings = Settings()


def get_database_url():
    return f'postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PASSWORD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}'


def get_token_data():
    return {
        'key': settings.KEY,
        'algorithm': settings.ALGORITHM
    }
