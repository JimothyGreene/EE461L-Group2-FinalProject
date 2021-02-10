# EE461L Project (Group 2)

Semester project for EE 416L (Software Engineering Lab)

## Development Environment

### Installation

This application makes use of Docker for development. The client and server are structured as two containers that are run concurrently using `docker-compose`. To make use of this, your local machine needs to have the Docker engine installed. You can find the instructions [here](https://docs.docker.com/engine/install/). If you run **macOS** or **Windows**, you should install the desktop application, which will attach the engine to your shell. If you run **WSL**, you need to have WSL2, and then you can follow [these](https://docs.docker.com/docker-for-windows/wsl/) instructions to get that setup.

### Development

After you have docker installed, it's as simple as running the `docker-compose up -d` command to spin up the containers. If it's the first time running this command or any changes have been made to the Docker configuration (anytime you need to rebuild the images), you'll need to run `docker-compose up -d --build`. Once the containers are running, you should be able to visit `localhost:5000` for the Flask server and `localhost:3000` for the React client. To shut it down, simply run `docker-compose down`.
