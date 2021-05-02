import React from 'react';
import Typography from '@material-ui/core/Typography';
import './Information.css';

export default function Information() {
  return (
    <div class="info-modal">
      <Typography variant="h2" style={{"text-align": "center", "padding-bottom": "0.4em"}}>Help Guide</Typography>
      
      {/* Dashboard */}
      <Typography variant="h4">Dashboard</Typography>
      <Typography id="text-body" variant="h6">After entering the app you'll land on the dashboard. Here you will find a navigation menu on the left that can take you to our different pages (resources, datasets, etc.) and cards on the page that show stats about your projects. From here you can switch to a specific project using the dropdown menu.</Typography>

      {/* Resources */}
      <Typography variant="h4">Resources</Typography>
      <Typography id="text-body" variant="h6">The resources page shows you all of the different hardware sets' capacities and availabilities. It also lets you check in or check out resources. Before checking in or checking out any resources, make sure to go to the projects page and select a project.</Typography>
      
      {/* Projects */}
      <Typography variant="h4">Projects</Typography>
      <Typography id="text-body" variant="h6">Once you've switched to a particular project, you're able to view the relevant information for it on the project page. On that page, you're also able to join a new project if you have the corresponding project ID or create a new project. There's a button to switch to a different project on this page as well.</Typography>
      
      {/* Billing */}
      <Typography variant="h4">Billing</Typography>
      <Typography id="text-body" variant="h6">The billing page shows you the costs associated with your projects. It's calculated by multiplying each hardware set's cost per hour by the number of hours the hardware has been checked out.</Typography>
      
      {/* Datasets */}
      <Typography variant="h4">Datasets</Typography>
      <Typography id="text-body" variant="h6">The datasets page has all of the datasets from <a href="https://physionet.org/" target="_blank">PhysioNet</a> and clicking one of the links will download the ZIP file for the corresponding dataset.</Typography>
    </div>
  )
}