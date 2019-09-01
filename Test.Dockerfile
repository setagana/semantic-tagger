FROM matthewdb/tfx-development:lts
ARG TASKFOLDERNAME
ARG TASKVERSION

WORKDIR /extension
COPY . .

WORKDIR ${TASKFOLDERNAME}/task-v${TASKVERSION}
RUN npm install && npm test