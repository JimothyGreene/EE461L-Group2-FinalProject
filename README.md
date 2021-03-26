# EE461L Project (Group 2)

Semester project for EE 416L (Software Engineering Lab)

## Checkpoints
Click here for [Checkpoint 1](https://github.com/JimothyGreene/EE461L-Group2-FinalProject/blob/main/docs/Phase%201.md).

## Development Environment

### Installation

This application makes use of Docker for development. The client and server are structured as two containers that are run concurrently using `docker-compose`. To make use of this, your local machine needs to have the Docker engine installed. You can find the instructions [here](https://docs.docker.com/engine/install/). If you run **macOS** or **Windows**, you should install the desktop application, which will attach the engine to your shell. If you run **WSL**, you need to have WSL2, and then you can follow [these](https://docs.docker.com/docker-for-windows/wsl/) instructions to get that setup.

### Development

After you have docker installed, it's as simple as running the `docker-compose up -d` command to spin up the containers. If it's the first time running this command or any changes have been made to the Docker configuration (anytime you need to rebuild the images), you'll need to run `docker-compose up -d --build`. Once the containers are running, you should be able to visit `localhost:5000` for the Flask server and `localhost:3000` for the React client. To shut it down, simply run `docker-compose down`.

### Database

Looking in `server/database`, `models.py` serves as the home of the MongoClient and database variable `db`. In there you will also find classes to represent database documents, which will just need a constructor for their fields and a function to convert the object into a document style JSON to put into the database. Whenever you add a new model, you need to update `__init__.py` to import that class and put it in the field `__all__` so that imports will continue to work as expected.


To check on the database, navigate to [localhost:8081](localhost:8081) to access Mongo Express, a visualization tool for MongoDB. You will be able to see the database(s), all collections, and the documents in those collections. **NOTE:** Be careful poking around Mongo Express, you are able to delete and edit the database. This is just for development.

### Seeding

Seeding in performed through the `mongo/init-mongo.js` file. To add additional seed data, use [mongo Shell Commands](https://docs.mongodb.com/manual/reference/method/) within the `init-mongo.js` file. Use of a `.js` file will allow us to use existing packages like faker to generate mock data during development. If you want to add an additional file for seeding, just create a new `.js` file in the `/mongo/` directory, and restart the docker containers.
 ***Note: Make sure the collection you use in seeding matches exactly the name of your model in Flask, otherwise they will appear in different collections.***

### OpenAPI Definition and Documentation (SwaggerUI)

To improve cohesion between frontend and backend development, we will use OpenAPI 3 specification and SwaggerUI to display it. To view SwaggerUI, navigate to [localhost:8080](localhost:8080), where the defintions will be displayed. To add to our specification, look in the `swagger/` directory where you will find `openapi.yml` and the `EndpointDocumentation/` directory. If adding a new general category of endpoints (ex. projects, hardware, etc.), add a new tag in the `openapi.yml` file and provide a description. When adding a new endpoint/path, specify that path in the `openapi.yml` file, and create a new `.yml` file in `EndpointDocumentation/`, and reference that file in `openapi.yml`.
***(Development Note: If using VSCode, install the OpenAPI (Swagger) Editor extension, this will provide linting and allow you to see changes in VSCode)***
