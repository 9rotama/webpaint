from db import session
from datetime import datetime
from schemas import PostParam, WorkPreview
from models import Work


def get_works_list(page_num: int):
    works_list = session.query(Work).all()
    works_preview_list: list[WorkPreview] = []
    for w in works_list:
        works_preview_list.append(
            WorkPreview(
                id=int(w.id),
                image_url="image_url",  # tmp
                title=w.title,
                artist=w.artist,
                likes=w.likes
            )
        )
    return works_preview_list


def get_work(work_id: int):
    target_work = session.query(Work).filter(
        Work.id == work_id).first()
    return target_work


def post_work(param: PostParam):
    work = Work(
        date=datetime.now(),
        image_url="test",  # tmp
        title=param.title,
        artist=param.artist,
        likes=0,
        description=param.description
    )
    session.add(work)
    session.commit()


def like_work(work_id: int):
    target_work = session.query(Work).filter(
        Work.id == work_id).first()
    target_work.likes += 1
    session.commit()
