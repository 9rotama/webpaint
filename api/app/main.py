from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Work:
    id: str
    url: str
    likes: int


class PostParam(BaseModel):
    artist: str
    name: str
    description: str
    image_data: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/discover/{page_num}")
async def discover(page_num: int):
    return {"message": page_num}


@app.get("/work/{work_id}")
async def work(work_id: str):
    return {"message": work_id}


@app.post("/post")
async def post(param: PostParam):
    return {"message": param}


@app.put("/like/{work_id}")
async def like(work_id: str):
    return {"message": work_id}
