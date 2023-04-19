from pydantic import BaseModel
from datetime import datetime


class PostParam(BaseModel):
    title: str
    artist: str
    description: str
    image_data: str


class Work(BaseModel):
    id: int
    image_path: str
    date: datetime
    title: str
    artist: str
    likes: str
    description: str
