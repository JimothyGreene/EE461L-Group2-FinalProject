import './Dataset.css'; 
import React from "react"; 
import Avatar from '@material-ui/core/Avatar'; 
import {
    Typography,
    Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';  
  
function createData(name, link) {
    return {name, link};
}
      
const datasetData = [
    createData("Abdominal and Direct Fetal ECG Database", "https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip"),
    createData("AF Termination Challenge Database", "https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip"),
    createData("AHA Database Sample Excluded Record", "https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip"),
    createData("ANSI/AAMI EC13 Test Waveforms", "https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip"),
    createData("Apnea-ECG Database", "https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip"),
    createData("A Pressure Map Dataset for In-bed Posture Classification", "https://physionet.org/static/published-projects/pmd/a-pressure-map-dataset-for-in-bed-posture-classification-1.0.0.zip"),
    createData("BIDMC Congestive Heart Failure Database", "https://physionet.org/static/published-projects/chfdb/bidmc-congestive-heart-failure-database-1.0.0.zip"),
    createData("BIDMC PPG and Respiration Dataset", "https://physionet.org/static/published-projects/bidmc/bidmc-ppg-and-respiration-dataset-1.0.0.zip"),
];

function getButton(link) {
    return (
        <Button variant="outlined" href={link}>
            Download 
        </Button>
    );
}

export default function Dataset() {
    const classes = makeStyles({
        table: {
            width: '50%',
        },
    });
    return(
        <TableContainer component={Paper} elevation={10} style={{margin: 'auto'}}>
            <Table className={classes.table} aria-label="simple table">
                {/* Table Head */}
                <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Download</TableCell>
                </TableRow>
                </TableHead>

                {/* Table Body */}
                <TableBody>
                {datasetData.map((row) => (
                    <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">
                        {/* Select the class and updates the state */}
                        {getButton(row.link)}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}