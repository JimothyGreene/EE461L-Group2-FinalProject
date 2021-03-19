import React from 'react';
import Link from '@material-ui/core/Link';
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
                                <ListItemText>Test Dataset 1</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>Test Dataset 2</ListItemText>
                            </ListItem>
                            <ListItem button>
                                <ListItemText>Test Dataset 3</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                </div>
                <div style={{marginLeft: "auto", marginRight: "0", marginBottom: "0", marginTop: "auto"}}>
                    <Link justify="flex-end" color="primary" href="#" onClick={preventDefault}>
                        See Other Datasets
                    </Link>
                </div>
            </React.Fragment>
    );
}