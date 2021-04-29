import React from 'react';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom'
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import api from '../util/api';

export default class ResourceCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            resourceInformation: [
                {
                resourceName: null,
                resourceCapacity: null,
                resourceAvailable: null,
                },
                {
                resourceName: null,
                resourceCapacity: null,
                resourceAvailable: null,
                },
            ]
        }
    }

    componentDidMount() {
        api().get("/hardware/").then((res) => {
            this.setState({
                resourceInformation: [
                    {
                    resourceName: res.data[0].name,
                    resourceCapacity: res.data[0].capacity,
                    resourceAvailable: res.data[0].available,
                    },
                    {
                    resourceName: res.data[1].name,
                    resourceCapacity: res.data[1].capacity,
                    resourceAvailable: res.data[1].available,
                    }
                ]
            });
            return;
        })
        .catch((e) => {
            console.log(e);
        })
    }



    render() {
        return(
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Resource Usage
                </Typography>
                <Grid container direction="row" alignItems="center" justify="space-evenly" spacing={4} style={{height: "100%"}}>
                    <Grid item alignContent="center" justify="center">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                            {this.state.resourceInformation[0].resourceName}
                        </Typography>
                        <Typography component="p" variant="h4" align="center" justify="center">
                            {this.state.resourceInformation[0].resourceAvailable} available
                        </Typography>
                        <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                            {this.state.resourceInformation[0].resourceCapacity} total capacity
                        </Typography>
                    </Grid>
                    <Grid item alignContent="center" justify="center">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                            {this.state.resourceInformation[1].resourceName}
                        </Typography>   
                        <Typography component="p" variant="h4" align="center" justify="center">
                            {this.state.resourceInformation[1].resourceAvailable} available
                        </Typography>
                        <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                            {this.state.resourceInformation[1].resourceCapacity} total capacity
                        </Typography>
                    </Grid>
                </Grid>
                <div style={{marginLeft: "auto", width: "100%", marginRight: "0", justifyContent: "flex-end", display: "flex"}}>
                    <Link justify="flex-start" color="primary" component={NavLink} to="/resources">
                        Manage Resources
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}