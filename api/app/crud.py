from fastapi import UploadFile

from db import session
from datetime import datetime
from schemas import WorkPreview
from models import Work
from image import save_image


def get_works_list(page_num: int):
    works_list = session.query(Work).all()
    works_preview_list: list[WorkPreview] = []
    for w in works_list:
        works_preview_list.append(
            WorkPreview(
                id=int(w.id),
                image_data="image_data",  # tmp
                title=w.title,
                artist=w.artist,
                likes=int(w.likes)
            )
        )
    return works_preview_list


def get_work(work_id: int):
    target_work = session.query(Work).filter(
        Work.id == work_id).first()
    return target_work


def post_work(image: UploadFile, title: str, artist: str, description: str):
    work = Work(
        date=datetime.now(),
        title=title,
        artist=artist,
        likes=0,
        description=description
    )
    session.add(work)
    session.commit()
    save_image(image, work.id)


def like_work(work_id: int):
    target_work = session.query(Work).filter(
        Work.id == work_id).first()
    target_work.likes += 1
    session.commit()
