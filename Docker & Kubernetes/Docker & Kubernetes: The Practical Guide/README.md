# Docker

### Useful Commands:

**Create image using Dockerfile**

- docker build --tag 'image-name' .
  In the end of the execution of this command, it will generate an hash that can be used in order to be ran with the next command.

**Run container using previous built image on port**

- docker run -p <port>:<port> <hash>

**Stop container**

- docker stop <container-name>

**List containers**

- docker ps
