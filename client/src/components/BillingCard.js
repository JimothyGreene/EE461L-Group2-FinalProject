import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import api from '../util/api';

function preventDefault(event) {
    event.preventDefault();
  }

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

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