from fastapi import FastAPI
from model import *

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/discover/{page_num}")
async def discover(page_num: int):
    return get_works_list(page_num)


@app.get("/work/{work_id}")
async def work(work_id: str):
    return get_work(work_id)


@app.post("/post")
async def post(param: PostParam):
    post_work(param)
    return {"message": "ok"}


@app.put("/like/{work_id}")
async def like(work_id: str):
    like_work(work_id)
    return {"message": "ok"}
