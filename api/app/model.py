from sqlalchemy import Column, Integer, String, DateTime
from pydantic import BaseModel
from db import Base, ENGINE, session
from datetime import datetime

# テーブル定義


class WorkTable(Base):
    __tablename__ = "paint_work"
    id = Column(Integer, primary_key=True, autoincrement=True)
    image_url = Column(String, nullable=False)
    date = Column(DateTime)
    name = Column(String, nullable=False)
    artist = Column(String, nullable=False)
    likes = Column(Integer)
    description = Column(String, nullable=False)


class WorkPreviewTable(Base):
    __tablename__ = "paint_work_list"
    id = Column(Integer, primary_key=True, autoincrement=True)
    image_url = Column(String, nullable=False)
    likes = Column(Integer)


class Work(BaseModel):
    id: int
    image_path: str
    date: str
    name: str
    artist: str
    likes: str
    description: str


class PostParam(BaseModel):
    artist: str
    name: str
    description: str
    image_data: str


def get_works_list(page_num: int):
    works_list = session.query(WorkPreviewTable).all()
    return works_list


def get_work(work_id: int):
    target_work = session.query(WorkTable).filter(
        WorkTable.id == work_id).first()
    return target_work


def post_work(param: PostParam):
    work = Work(
        date=datetime.now(),
        image_path="test",
        name=param.name,
        artist=param.artist,
        likes=0,
        description=param.description
    )
    session.add(work)
    session.commit()


def like_work(work_id: int):
    target_work = session.query(WorkTable).filter(
        WorkTable.id == work_id).first()
    target_work.likes += 1
    session.commit()


if __name__ == "__main__":
    # テーブル構築
    Base.metadata.create_all(bind=ENGINE)
