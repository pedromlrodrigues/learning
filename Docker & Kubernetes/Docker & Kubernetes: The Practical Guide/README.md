# Docker

### Useful Commands:

**Create image using Dockerfile**

- docker build .
  In the end of the execution of this command, it will generate an hash that can be used in order to be ran with the next command.

**Run container using previous built image on port**

- docker run -p \<local-port>:\<exposed-port> \<image-hash>

**Run container, providing an interactive and persistent terminal session within that container**

- docker run -it \<image-name>

**Stop container**

- docker stop \<container-name>

**List running containers**

- docker ps

**List containers created by Docker**

- docker ps -a
