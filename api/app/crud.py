from fastapi import UploadFile
from datetime import datetime

import db
import models
import schemas
import files


def get_works_list(page_num: int):
    model = db.session.query(
        models.Work.id,
        models.Work.title,
        models.Work.artist,
        models.Work.likes
    ).all()
    works_preview_list: list[schemas.WorkPreview] = []
    for w in model:
        works_preview_list.append(
            schemas.WorkPreview(
                id=int(w.id),
                title=w.title,
                artist=w.artist,
                likes=int(w.likes)
            )
        )
    return works_preview_list


def get_work(work_id: int):
    model = db.session.query(models.Work).filter(
        models.Work.id == work_id).first()
    target_work = schemas.Work(
        id=int(model.id),
        date=model.date,
        title=model.title,
        artist=model.artist,
        likes=int(model.likes),
        description=model.description
    )
    return target_work


def post_work(image: UploadFile, title: str, artist: str, description: str):
    new_work = models.Work(
        date=datetime.now(),
        title=title,
        artist=artist,
        likes=0,
        description=description
    )
    db.session.add(new_work)
    db.session.commit()
    files.save_image(image, new_work.id)


def like_work(work_id: int):
    model = db.session.query(models.Work).filter(
        models.Work.id == work_id).first()
    model.likes += 1
    db.session.commit()
