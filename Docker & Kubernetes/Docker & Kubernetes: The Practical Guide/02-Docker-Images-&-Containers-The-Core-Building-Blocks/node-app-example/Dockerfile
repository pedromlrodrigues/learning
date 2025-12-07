FROM node

WORKDIR /app

COPY package.json /app

RUN npm install 

# It will copy into WORKDIR set before even though the COPY instruction is using the '.' character
COPY . .

# Recommended instruction but not enough to expose the port. Serves mainly as documentation.
# -p flag when running the application should specify the local port and the exposed port.
EXPOSE 80

# The CMD instruction will only run when a container is started
CMD ["node", "server.js"]
