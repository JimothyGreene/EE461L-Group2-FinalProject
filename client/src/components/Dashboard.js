import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import ResourceCard from './ResourceCard';
import ProjectCard from './ProjectCard';
import DatasetCard from './DatasetCard';
import BillingCard from './BillingCard';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return(
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={8}>
                    <Paper className={fixedHeightPaper}>
                        <ResourceCard />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                        <ProjectCard />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper className={fixedHeightPaper}>
                        <DatasetCard />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Paper className={fixedHeightPaper}>
                        <BillingCard />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );

}
