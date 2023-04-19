from pydantic import BaseModel
from datetime import datetime


class PostParam(BaseModel):
    title: str
    artist: str
    description: str
    image_data: str


class Work(BaseModel):
    id: int
    image_url: str
    date: datetime
    title: str
    artist: str
    likes: str
    description: str


class WorkPreview(BaseModel):
    id: int
    image_url: str
    title: str
    artist: str
    likes: str
