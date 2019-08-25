FROM matthewdb/tfx-development:lts
WORKDIR /app

# TODO: Change path "./RENAMETask-Name" to the updated folder name for the task
COPY ./RENAMETask-Name ./

RUN npm install
RUN npm test