import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

function preventDefault(event) {
    event.preventDefault();
  }

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

export default function BillingCard() {
    const classes = useStyles();
    return(
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Billing Info
            </Typography>
            <Grid container direction="row" alignItems="center" justify="space-evenly" spacing={4} style={{height: "100%"}}>
                <Grid item alignContent="center" justify="center">
                    <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                        HWSet1
                    </Typography>
                    <Typography component="p" variant="h4" align="center" justify="center">
                        45hrs
                    </Typography>
                    <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                        1cr/hr
                    </Typography>
                </Grid>
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
            <div style={{marginLeft: "auto", marginRight: "0"}}>
                <Link justify="flex-start" color="primary" component={NavLink} to="/billing">
                    View Billing Details
                </Link>
            </div>
        </React.Fragment>
    );
}