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

### Backend: Flask Python
Flask is a lightweight Python-based framework that is easier to work with than other frameworks such as Django. Flask abstracts a lot of the complex backend code required for traditional JavaScript backends making it beginner-friendly. Flask will also allow us to easily access databases in a user-friendly manner.
Python’s object-oriented capabilities will allow for simple representations of various hardware sets and structures we might use. Python also has numerous libraries that allow developers to quickly add new features.

### Frontend: React
React is a modern, component-based frontend framework that makes it easy to reuse pieces of software across a website. This gives React sites a consistent design and pages are effectively equivalent to hierarchies of components. There are also numerous libraries like Material UI that are created for React and allow developers to get started quickly using pre-built components that follow Google’s design principles.

### Database: MongoDB
MongoDB’s JSON-like data format will allow for easier integration with the Flask as we can utilize the object-oriented features of python. The NoSQL database that mongoDB offers allows us to develop and organize data with relationships, partial relationships, or no relationship as we see fit. This gives us more flexibility in the way we manage data. Flask and MongoDB are also compatible with one another allowing for ease of use for development.

### Deployment: Google Cloud
Google Cloud allows for free deployment because students are given credit. GCP is an established and widely utilized platform for deploying software. Some of the other alternatives were Amazon AWS and Microsoft Azure. However, we felt that using Google Cloud would be the best option since it was what we were most familiar with.

### Environment Management: Docker
We also chose to use Docker as it provides containerization to help manage environment versions and dependency issues during development. It also allows us to easily deploy the container images to the cloud and utilize GitHub actions for CI/CD.
deploy the container images to the cloud and utilize GitHub actions for CI/CD

## GitHub Usage
In order to ensure that we are minimizing technical debt and catching bugs early, we are enforcing a strict code review policy. The `main` branch of our repository is push protected, meaning that we cannot directly push changes to it. In order to make a change to the `main` branch, we must first create a feature branch, open a pull request, and have that pull request approved by 2 other members of the team. Only then can the code be merged into `main`. 
