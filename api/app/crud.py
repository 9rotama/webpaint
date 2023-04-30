from fastapi import UploadFile
from datetime import datetime

import db
import models
import schemas
import files


def get_works_list(page_num: int):
    works_list = db.session.query(models.Work).all()
    works_preview_list: list[schemas.WorkPreview] = []
    for w in works_list:
        works_preview_list.append(
            schemas.WorkPreview(
                id=int(w.id),
                image_data="image_data",  # tmp
                title=w.title,
                artist=w.artist,
                likes=int(w.likes)
            )
        )
    return works_preview_list


def get_work(work_id: int):
    target_work = db.session.query(models.Work).filter(
        schemas.Work.id == work_id).first()
    return target_work


def post_work(image: UploadFile, title: str, artist: str, description: str):
    work = models.Work(
        date=datetime.now(),
        title=title,
        artist=artist,
        likes=0,
        description=description
    )
    db.session.add(work)
    db.session.commit()
    files.save_image(image, work.id)


def like_work(work_id: int):
    target_work = db.session.query(models.Work).filter(
        schemas.Work.id == work_id).first()
    target_work.likes += 1
    db.session.commit()
