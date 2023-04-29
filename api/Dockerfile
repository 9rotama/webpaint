FROM python:3.9.13-buster

RUN apt-get update && \
  python -m pip install \
  --upgrade pip \
  --upgrade setuptools &&\
  python -m pip install "uvicorn[standard]" &&\
  python -m pip install fastapi &&\
  python -m pip install sqlalchemy &&\
  python -m pip install mysqlclient &&\
  python -m pip install mysql-connector-python &&\
  python -m pip install python-multipart