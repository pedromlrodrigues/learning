# Docker

### Useful Commands:

**Create image using Dockerfile**

- docker build .
  In the end of the execution of this command, it will generate an hash that can be used in order to be ran with the next command.

**Run container using previous built image on port**

- docker run -p \<local-port>:\<exposed-port> \<image-hash or image-name>

**Run container, providing an interactive and persistent terminal session within that container**

- docker run -it <image-hash or image-name>

**Run container, providing an option to delete the container after it exits**

- docker run --rm \<image-hash or image-name>

**Start existing container**

- docker start \<container-name>

**Stop container**

- docker stop \<container-name>

**Delete stopped containers (boring and overworked way)**

- docker rm <...container-names>

**Delete images**

- docker rmi <...image-ids>

**List images**

- docker images

**List running containers**

- docker ps

**List containers created by Docker**

- docker ps -a

**Check container logs**

- docker logs \<image-hash or image-name>
