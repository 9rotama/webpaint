from pydantic import BaseModel
from datetime import datetime


class Work(BaseModel):
    id: int
    date: datetime
    title: str
    artist: str
    likes: int
    description: str


class WorkPreview(BaseModel):
    id: int
    title: str
    artist: str
    likes: int
