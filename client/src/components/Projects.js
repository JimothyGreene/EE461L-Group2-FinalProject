import './Projects.css';
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

class Projects extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            ProjectName: "",
            SelectedProjectName: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.dropChange = this.dropChange.bind(this);

    }
    quantityChange(event){
        const qty = event.target.value;
        this.setState({quantity : qty})
    }
    dropChange(event){
        const hrdwr = event.target.value;
        this.setState({hardware: hrdwr})
    }


    handleClick(event) {
        //api call with state quantity (this.state.quantity)
        console.log(this.state.quantity, this.state.hardware)
    }
    render() {
        return(
            <Container component="main" maxWidth="xl"
            style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center', padding: '100px'}}>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede', height: '248px'}}>
                    <div style={{width: '750px', backgroundColor: 'lightblue'}}>
                        {this.state.SelectedProjectName}
                    </div>
                    <div className="quantity"  
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Projects</InputLabel>
                        <Select 
                        //style={{width: '200px', height: '40px'}}
                        onChange = {(e) => this.setState({ProjectName: e.target.value})}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select">
                            <MenuItem value={"Project 1"}>P1</MenuItem>                        
                            <MenuItem value={"Project 2"}>P2</MenuItem>                        
                            <MenuItem value={"Project 3"}>P3</MenuItem>                        
                            <MenuItem value={"Project 4"}>P4</MenuItem>                        
                            <MenuItem value={"Project 5"}>P5</MenuItem>                        
                        </Select>
                        <Button
                            style={{marginTop: '10px'}}
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
                            onClick = {(e) => this.setState({SelectedProjectName: this.state.ProjectName})}
                        >
                            Switch Project
                        </Button>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '50px', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede'}}>
                    <div className="quantity"
                    style={{display: 'flex', flexDirection: 'column', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '1000px'}}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            halfWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            onChange = {this.quantityChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            halfWidth
                            id="id"
                            label="ID"
                            name="id"
                            autoComplete="id"
                            onChange = {this.quantityChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            halfWidth
                            id="desc"
                            label="Description"
                            name="desc"
                            autoComplete="desc"
                            onChange = {this.quantityChange}
                        />
                        <Button
                            halfWidth
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
                            onClick = {this.handleClick}
                        >
                            Create New Project
                        </Button>
                    </div>
                </div>
                
            </Container>
        );
    }
    
}

export default Projects;