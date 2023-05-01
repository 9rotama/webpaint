from fastapi import UploadFile, File
import shutil
import base64


def save_image_file(upload_file: UploadFile, work_id: str):
    path = "../image_data/%s.webp" % (work_id)
    f = open(path, 'wb')
    shutil.copyfileobj(upload_file.file, f)
    f.close()


def get_encoded_image(work_id: str):
    path = "../image_data/%s.webp" % (work_id)
    f = open(path, 'rb')
    data = f.read()
    encoded_img = base64.b64encode(data).decode('utf-8')
    f.close()
    return encoded_img
