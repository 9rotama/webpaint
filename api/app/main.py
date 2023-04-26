from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

import schemas
import crud
from db import ENGINE, Base

Base.metadata.create_all(bind=ENGINE)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/discover/{page_num}")
async def discover_work(page_num: int) -> list[schemas.WorkPreview]:
    return crud.get_works_list(page_num)


@app.get("/work/{work_id}")
async def get_work(work_id: str) -> schemas.Work:
    return crud.get_work(work_id)


@app.post("/post")
async def post_work(param: schemas.PostParam):
    crud.post_work(param)
    return {"message": "ok"}


@app.put("/like/{work_id}")
async def like_work(work_id: str):
    crud.like_work(work_id)
    return {"message": "ok"}
