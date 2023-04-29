from pydantic import BaseModel
from datetime import datetime


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
