FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install 

COPY . .

# Default value for environment variables but can be overriden by using --env flag when running the container
ENV PORT 80

EXPOSE $PORT

# Anonymous volumes are managed by Docker and are removed after the container exits when configured like this
# The alternative is "Named Volumes"
# VOLUME [ "/app/feedback" ]

CMD [ "node", "server.js" ]