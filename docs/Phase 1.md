# Phase 1 Deliverables

## Project Summary
Our project is to develop a HaaS platform where users can rent hardware resources and be charged for the time they use. This platform should also allow them to create accounts so that they can have a unique experience across the site. The users will then be able to create projects, which can then be associated with different hardware sets if they are available. Lastly, users should be able to download and view datasets on their local machines so that they can preview the data that they would potentially use in their project.

## User Stories
The user stories can be found [here](https://github.com/JimothyGreene/EE461L-Group2-FinalProject/projects/4), or in the **Projects** tab then **Tasks**.

## Sketches

### Login
![Login](resources/EE461L%20Sketch-Login.png)

### Hardware
![Hardware](resources/EE461L%20Sketch-Hardware.png)

### Projects
![Projects](resources/EE461L%20Sketch-Projects.png)

### Datasets
![Datasets](resources/EE461L%20Sketch-Datasets.png)

## Tools
Most of these tools were chosen because they were recommended by the project description
- For our **backend**, we chose to use **Python Flask**
- For our **frontend**, we chose to use **React**
- For our **database**, we chose to use **MongoDB**
- For **deployment**, we will use Google Cloud
- We also chose to use **Docker** for containerization to help manage environment versions and dependency issues during development. It also allows us to easily deploy the container images to the cloud and utilize GitHub actions for CI/CD

## GitHub Usage
In order to ensure that we are minimizing technical debt and catching bugs early, we are enforcing a strict code review policy. The `main` branch of our repository is push protected, meaning that we cannot directly push changes to it. In order to make a change to the `main` branch, we must first create a feature branch, open a pull request, and have that pull request approved by 2 other members of the team. Only then can the code be merged into `main`. 
