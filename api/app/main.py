from fastapi import FastAPI, UploadFile, Form
from starlette.middleware.cors import CORSMiddleware
from typing import Annotated

import schemas
import crud
import db

db.Base.metadata.create_all(bind=db.ENGINE)


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
async def discover_work(page_num: int):
    return crud.get_works_list(page_num)


@app.get("/work/{work_id}")
async def get_work(work_id: str):
    return crud.get_work(work_id)


@app.post("/post")
async def post_work(image: UploadFile, title: Annotated[str, Form()], artist: Annotated[str, Form()], description: Annotated[str, Form()]):
    crud.post_work(image, title, artist, description)
    return {"message": "ok"}


@app.put("/like/{work_id}")
async def like_work(work_id: str):
    crud.like_work(work_id)
    return {"message": "ok"}


@app.put("/removelike/{work_id}")
async def remove_like_work(work_id: str):
    crud.remove_like_work(work_id)
    return {"message": "ok"}
