import './Projects.css';
import React from "react";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
<<<<<<< HEAD
import api from '../util/api';
import { AuthContext } from './AuthContext';
import { makeStyles } from '@material-ui/core/styles';

class BillingCard extends React.Component {
    static contextType = AuthContext;
=======
import { NavLink } from 'react-router-dom';
import api from '../util/api';
>>>>>>> 818812ec2db88f28e8e8d7bbdb0869342307964d

    constructor(props) { 
        super(props);
        this.state = {
            currProjectName: "",
            currProjectID: "",
            currProjectDescription: "",
            allProjects: [],
            selectedProjectID: "",
            selectedProjectName: "",
            joinId: "",
            joinError: false,
            currProjectHardware: [],
            joinHelperText: ""
        };
        // this.handleNewProj = this.handleNewProj.bind(this);
        this.projectSelected = this.projectSelected.bind(this);
        // this.switchProject = this.switchProject.bind(this);
        // this.joinById = this.joinById.bind(this);

    }

<<<<<<< HEAD
    getProjects() {
        if(this.state.currProjectID !== null && this.state.currProjectID !== undefined) {
            api().get(`projects/${this.state.currProjectID.replace(/['"]+/g, '')}`)
                .then((res) => {
                    this.setState({
                        currProjectName: res.data.name.replace(/['"]+/g, ''),
                        currProjectID: res.data.project_id.replace(/['"]+/g, ''),
                        currProjectDescription: res.data.description.replace(/['"]+/g, ''),
                        currProjectHardware: res.data.hardware
                    })
                })
                .catch((e) => {
                    console.log(e)
                });
        }
        api().get('projects/')
            .then((res) => {
                this.setState({allProjects: res.data});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.setState({
            allProjects: [],
            joinError: false,
            joinHelperText: ""
        });
        if(this.context.state.projectID !== null && this.context.state.projectID !== undefined) {
            api().get(`projects/${this.context.state.projectID.replace(/['"]+/g, '')}`)
                .then((res) => {
                    this.setState({
                        currProjectName: res.data.name.replace(/['"]+/g, ''),
                        currProjectID: res.data.project_id.replace(/['"]+/g, ''),
                        currProjectDescription: res.data.description.replace(/['"]+/g, ''),
                        currProjectHardware: res.data.hardware
                    })
                })
                .catch((e) => {
                    console.log(e)
                });
        }
        api().get('projects/')
            .then((res) => {
                this.setState({allProjects: res.data});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    projectSelected(e){
        this.setState({
            selectedProjectName: e.target.value,
            selectedProjectID: e.currentTarget.id

        });
    }

    render() {

        return(
                <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Billing
                </Typography>
                <Grid container direction="row" alignItems="center" justify="center" justify="space-evenly" spacing={4} style={{height: "100%"}}>
                    {this.state.currProjectHardware.map((hardware) => (
                        <Grid item alignContent="center" justify="center">
                            <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                              {hardware.name}
                            </Typography>
                            <Typography component="p" variant="h4" align="center" justify="center">
                              ${hardware.cost.toFixed(2)}
                            </Typography>
                            <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                              {hardware.amount} units
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <div style={{marginLeft: "auto", marginRight: "0", marginBottom: "0", marginTop: "auto"}}>
                    <Link justify="flex-start" color="primary" component={NavLink} to="/Billing">
                        See My Billing
                    </Link>
                </div>
            </React.Fragment>
        );
    }
}

export default BillingCard;
=======
export default class BillingCard extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            currentProjectHardware: []
        }
    }

    componentDidMount() {
        console.log("testing")
        api().get("/projects/")
                .then((res) => {
                    console.log(res)
                    this.setState({
                        currProjectHardware: res.data.hardware
                    });
                })
                .catch((e) => {
                    console.log("NOTWORKING", e)
                    if(e.response !== null && e.response !== undefined) {
                        this.setState({
                            joinError: true,
                            joinHelperText: e.response.data.msg.replace(/['"]+/g, '')
                        });
                    } else {
                        this.setState({
                            joinError: true,
                            joinHelperText: "Invalid ID"
                        });
                    }
                    
            });
    }

    render() {
        //const classes = useStyles();
        return(
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Billing Info
                </Typography>
                <Grid container direction="row" alignItems="center" justify="space-evenly" spacing={4} style={{height: "100%"}}>
                    {
                        this.state.currentProjectHardware.map(set=>{
                            return(
                                <Grid item alignContent="center" justify="center">
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                                        {set._id}
                                    </Typography>
                                    <Typography component="p" variant="h4" align="center" justify="center">
                                        {set.cost}
                                    </Typography>
                                    
                                </Grid>   
                                 
                            )
                        })
                    }
                    <Grid item alignContent="center" justify="center">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                            +
                        </Typography>
                    </Grid>
                    <Grid item alignContent="center" justify="center">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                            HWSet2
                        </Typography>
                        <Typography component="p" variant="h4" align="center" justify="center">
                            20hrs
                        </Typography>
                        <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                            2cr/hr
                        </Typography>
                    </Grid>
                    <Grid item alignContent="center" justify="center">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                            =
                        </Typography>
                    </Grid>
                    <Grid item alignContent="center" justify="center">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                            Total
                        </Typography>
                        <Typography component="p" variant="h4" align="center" justify="center">
                            85cr
                        </Typography>
                        <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                            Balance: 100cr
                        </Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
    
}
>>>>>>> 818812ec2db88f28e8e8d7bbdb0869342307964d
