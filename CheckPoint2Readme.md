# Checkpoint 2

## Deployed Application
[http://ee461l-final-project-group-2.herokuapp.com/](http://ee461l-final-project-group-2.herokuapp.com/)

## User Instructions

#### Account Creation
Either create a new account or sign into an existing account. If there are any login or registration validation errors they will be displayed on the form.

#### Dashboard
After entering the app you'll land on the dashboard. Here you will find a navigation menu on the left that can take you to our different pages (resources, datasets, etc.) and cards on the page that show stats about your projects. From here you can switch to a specific project using the dropdown menu.

#### Projects
Once you've switched to a particular project, you're able to view the relevant information for it on the project page. On that page, you're also able to join a new project if you have the corresponding project ID or create a new project. There's a button to switch to a different project on this page as well.

#### Hardware Resources
The resources page shows you all of the different hardware sets' capacities and availabilities. It also lets you check in or check out resources. Before checking in or checking out any resources, make sure to go to the projects page and select a project.

#### Datasets
The datasets page has all of the datasets from [PhysioNet](https://physionet.org/) and clicking one of the links will download the ZIP file for the corresponding dataset.

## Known Issues

#### Backend
- Check in doesn't check if the user is trying to check in more than the capacity
- Key errors should be caught across the board since currently it just returns an `Internal Server Error (500)` if the server receives unexpected parameters

#### Frontend
- Attempting to check in or check out a resource after refreshing the page will not do anything because the project ID state is not being stored properly
- After log in from a new browser, the authorization header is not being set until page refresh, so certain database information related to an account will not show
- Certain validation errors from the backend need to be displayed
- The dashboard just displays filler text for the hardware sets and billing

## Commits
We created branches for all new features and used GitHub's squash-and-merge feature to avoid cluttering the `main` branch. The commits shown per team member on `main` designate the features each member worked on.