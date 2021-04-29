import './Dataset.css';
import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';

class Dataset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    
    }
    render() {
        return(
            <Container component="main" maxWidth="xl"
            style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center', padding: '100px'}}>
                <div class="datasets" style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede'}}>
                    <div>
                        <span>Abdominal and Direct Fetal ECG Database</span>
                        <a href="https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip">Download</a>
                    </div>
                    <div>
                        <span>AF Termination Challenge Database</span>
                        <a href="https://physionet.org/static/published-projects/aftdb/af-termination-challenge-database-1.0.0.zip">Download</a>
                    </div>
                    <div>
                        <span>AHA Database Sample Excluded Record</span>
                        <a href="https://physionet.org/static/published-projects/ahadb/aha-database-sample-excluded-record-1.0.0.zip">Download</a>
                    </div>
                    <div>
                        <span>ANSI/AAMI EC13 Test Waveforms</span>
                        <a href="https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip">Download</a>
                    </div>
                    <div>
                        <span>Apnea-ECG Database</span>
                        <a href="https://physionet.org/static/published-projects/aami-ec13/ansiaami-ec13-test-waveforms-1.0.0.zip">Download</a>
                    </div>
                    <div>
                        <span>A Pressure Map Dataset for In-bed Posture Classification</span>
                        <a href="https://physionet.org/static/published-projects/pmd/a-pressure-map-dataset-for-in-bed-posture-classification-1.0.0.zip">Download</a>
                    </div>
                    <div>
                        <span>BIDMC Congestive Heart Failure Database</span>
                        <a href="https://physionet.org/static/published-projects/chfdb/bidmc-congestive-heart-failure-database-1.0.0.zip">Download</a>
                    </div>
                    <div>
                        <span>BIDMC PPG and Respiration Dataset</span>
                        <a href="https://physionet.org/static/published-projects/bidmc/bidmc-ppg-and-respiration-dataset-1.0.0.zip">Download</a>
                    </div>
                    

                </div>
                
                
            </Container>
        );
    }
    
}

export default Dataset;