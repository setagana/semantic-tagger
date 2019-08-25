FROM matthewdb/tfx-development:lts
WORKDIR /app

COPY ./task-v0 ./

RUN npm install