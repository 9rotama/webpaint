from fastapi import UploadFile
import shutil


def save_image(upload_file: UploadFile, work_id: str):
    path = "../image_data/%s.webp" % (work_id)
    f = open(path, 'wb')
    shutil.copyfileobj(upload_file.file, f)
    f.close()
