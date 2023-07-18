GET http://localhost:8001
GET http://localhost:8001/questions
GET http://localhost:8001/users

GET http://localhost:8001/users/1

PATCH http://localhost:8001/users/1
Content-Type: application/json

{
"password":"1"
}

POST http://localhost:8001/auth/login
Content-Type: application/json

{
"password":"1",
"email":"avakdev@gmail.com"
}

GET http://localhost:8001/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYXZha2RldkBnbWFpbC5jb20iLCJpYXQiOjE2ODk2OTY2ODgsImV4cCI6MTY4OTc1NjY4OH0.mqGD9hxmxYOEeBGPQEjOYoQjiSfH62toLPVo2h6Ld6A
