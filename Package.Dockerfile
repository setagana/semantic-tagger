FROM matthewdb/tfx-development:lts
ARG TASKFOLDERNAME
ARG TASKVERSION
ARG YOURORGANIZATION
ARG PAT

WORKDIR /extension
COPY . .

WORKDIR ${TASKFOLDERNAME}/task-v${TASKVERSION}
RUN npm install && npm test

WORKDIR /extension
RUN tfx extension publish --manifest-globs vss-extension.json --output-path ./published/task-extension.vsix --share-with ${YOURORGANIZATION} --auth-type pat --token ${PAT}