import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

function preventDefault(event) {
    event.preventDefault();
  }

export default function ResourceCard() {
    return(
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Resource Usage
            </Typography>
            <Grid container direction="row" alignItems="center" justify="space-evenly" spacing={4} style={{height: "100%"}}>
                <Grid item alignContent="center" justify="center">
                    <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                        HWSet1
                    </Typography>
                    <Typography component="p" variant="h4" align="center" justify="center">
                        35 in use
                    </Typography>
                    <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                        70 available
                    </Typography>
                </Grid>
                <Grid item alignContent="center" justify="center">
                    <Typography component="h2" variant="h6" color="primary" gutterBottom align="center" justify="center">
                        HWSet2
                    </Typography>
                    <Typography component="p" variant="h4" align="center" justify="center">
                        15 in use
                    </Typography>
                    <Typography color="textSecondary" align="center" justify="center" style={{flex: 1}}>
                        50 available
                    </Typography>
                </Grid>
            </Grid>
            <div style={{marginLeft: "auto", marginRight: "0"}}>
                <Link justify="flex-end" color="primary" href="#" onClick={preventDefault}>
                    Manage Resources
                </Link>
            </div>
        </React.Fragment>
    );
}