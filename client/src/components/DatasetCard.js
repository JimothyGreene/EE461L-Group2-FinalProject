import React from 'react';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {Grid, List, ListItem, ListItemText} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


function preventDefault(event) {
    event.preventDefault();
  }

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    list: {
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function DatasetCard() {
    const classes = useStyles();
    return(
            <React.Fragment>
                <div className={classes.root}>
                    <Typography component="h2" variant="h6" color="primary">
                        Datasets
                    </Typography>
                    <div className={classes.list}>
                        <List dense>
                            <ListItem button>
                                <ListItemText>Apnea-ECG Database</ListItemText>
                                <a href="https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip" target="_blank">Download</a>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>ANSI/AAMI EC13 Test Waveforms</ListItemText>
                                <a href="https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip" target="_blank">Download</a>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>BIDMC PPG and Respiration Dataset</ListItemText>
                                <a href="https://physionet.org/static/published-projects/bidmc/bidmc-ppg-and-respiration-dataset-1.0.0.zip" target="_blank">Download</a>
                            </ListItem>
                        </List>
                    </div>
                </div>
                <div style={{marginLeft: "auto", marginRight: "0", marginBottom: "0", marginTop: "auto"}}>
                    <Link justify="flex-start" color="primary" component={NavLink} to="/datasets">
                        See Other Datasets
                    </Link>
                </div>
            </React.Fragment>
    );
}