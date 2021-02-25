# Phase 1 Deliverables

## Project Summary
Our project is to develop a HaaS platform where users can rent hardware resources and be charged for the time they use. This platform should also allow them to create accounts so that they can have a unique experience across the site. The users will then be able to create projects, which can then be associated with different hardware sets if they are available. Lastly, users should be able to download and view datasets on their local machines so that they can preview the data that they would potentially use in their project.

## User Stories
The user stories can be found [here](https://github.com/JimothyGreene/EE461L-Group2-FinalProject/projects/4), or in the **Projects** tab then **Tasks**. In order to craft our user stores, we first split the functionality of the site into four main categories: users, projects, hardware sets, and data sets. These four categories encompass the main items/actions that our users will be encountering on our site. 
1. **Users:** The primary aspect of our site that deals directly with users is the login/registration functionality, so the first user stories we wrote for this category revolved around that. Next, we thought about how different types of users would use our platform. We decided that people could be using this platform for personal use as well as for use with their organization/company. So, we decided to add user stories that allowed managers to create/manage their organizations. This way, we can have different types of users depending on how they are using our site.
2. **Projects:** Projects will typically be created and managed by our users, so we started with that simple use case. From there, we thought about how users would want to organize their projects. We wrote stories that allow for project hierarchies and project ownership by organizations. When thinking about how the different aspects of our site come together, we also discussed how users would want to use specific hardware sets for specific projects, so we allow them to be associated. Lastly, we know that some users will have a large list of projects that will be difficult to search through manually, so we want to allow users to search through their projects by different attributes.
3. **Hardware Sets:** When thinking about hardware sets, we first needed to think about what aspects of the hardware sets we wanted to manage. The capacity and the availability for each set is a basic requirement, so we wrote stories to accommodate for that. Next, we thought about additional attributes for each set. We decided to associate a cost per unit time with each set as well as certain computational capabilities. Then, we wrote user stories that will allow users to view costs, computational abilities, and all hardware set features along with reports that summarize their usages.
4. **Data Sets:** For this last primary section of our site, we discussed how our users would want to use the data sets. We decided that the main use of the data sets would be to view available data sets and download them from the site. Our first user stories for this category reflect that need. Then, we thought about additional uses of data sets. Each data set is typically used on a particular project, so we want to allow users to associate their data sets with their own projects. That way, they can easily keep track of which data sets they've chosen for their projects. 

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
