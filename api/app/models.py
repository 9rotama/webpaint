from sqlalchemy import Column, Integer, String, DateTime
from db import Base

# テーブル定義


class Work(Base):
    __tablename__ = "WorkTable"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(DateTime, nullable=False)
    title = Column(String, nullable=False)
    artist = Column(String, nullable=False)
    likes = Column(Integer, nullable=False)
    description = Column(String, nullable=True)
