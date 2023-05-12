# webpaint
Web上でお絵描きしてアップロードできるサイト

## features
- Webサイト上でお絵描きができる
- 描いた絵をアップロードし公開することができる

## technologies
### frontend
言語: Typescript
フレームワーク: Next.js 13(app directory)
CSSフレームワーク: TailwindCSS
### backend
言語: Python
フレームワーク: FastAPI
### database / others
- MySQL
- Docker

## development
### front 
1.　開発サーバを起動
```
$ cd front
$ npm i
$ npm run dev
```
2. `https:://localhost:3000`にアクセス
### api
1. コンテナを起動する
```
$ cd api
$ docker compose up -d --build
```
2. コンテナのターミナルに入る

```
$ docker exec -it api-app-1 /bin/bash
```
もしくは、Docker Desktopにてapi-app-1のコンテナを見つけてOpen in Terminalを選択

3. サーバーを起動
```
$ cd usr/src/app
$ ./run.sh
```
