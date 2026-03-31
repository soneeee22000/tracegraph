from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    llm_model: str = "anthropic/claude-sonnet-4-20250514"
    llm_api_key: str = ""
    llm_api_base: str = "https://api.anthropic.com/v1"

    embedding_model: str = "text-embedding-3-small"
    embedding_api_key: str = ""
    embedding_api_base: str = "https://api.openai.com/v1"

    working_dir: str = "./graph_store"
    corpus_dir: str = "./corpus"
    host: str = "0.0.0.0"
    port: int = 8000
    cors_origins: str = "http://localhost:3000,http://localhost:3001"

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
