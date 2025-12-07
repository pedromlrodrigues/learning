FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 80

# Anonymous volumes are managed by Docker and are removed after the container exits when configured like this
# The alternative is "Named Volumes"
# VOLUME [ "/app/feedback" ]

CMD [ "node", "server.js" ]