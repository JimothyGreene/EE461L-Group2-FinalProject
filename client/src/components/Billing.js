import './Projects.css';
import React from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import api from '../util/api';
import { AuthContext } from './AuthContext';

class Billing extends React.Component {
    static contextType = AuthContext;

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
        var totalCost = 0.0;
        var totalUnits = 0;
        
        this.state.currProjectHardware.forEach(element => {
            totalCost += element.cost;
            totalUnits += element.amount;
        });
        return(
            <Paper style={{
                height: '50vh',
                width: '50vw',
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column'}}>
                <Grid container direction="row" alignItems="center" justify="space-evenly" spacing={4} style={{height: "100%"}}>
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
                <Grid container direction="row" alignItems="center" justify="space-evenly" spacing={4} style={{height: "100%"}}>
                    <Grid item alignContent="center" justify="center">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                            Total Cost
                        </Typography>
                        <Typography component="p" variant="h4" align="center" justify="center">
                            ${totalCost.toFixed(2)}
                        </Typography>
                        <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                            {totalUnits} units
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Billing;