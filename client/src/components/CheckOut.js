import './CheckOut.css';
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

class CheckOut extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            <Container component="main" maxWidth="xs"
            style={{display: 'flex', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>
                <div className="quantity"
                 style={{display: 'flex', flexDirection: 'column',     border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white'}}>
                <InputLabel id="demo-simple-select-label">Hardware Set</InputLabel>
                    <Select 
                    //style={{width: '200px', height: '40px'}}
                    onChange = {this.dropChange}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select">
                        <MenuItem value={"1 MBPS"}>1 MBPS</MenuItem>                        
                        <MenuItem value={"5 MBPS"}>5 MBPS</MenuItem>                        
                        <MenuItem value={"10 MBPS"}>10 MBPS</MenuItem>                        
                        <MenuItem value={"50 MBPS"}>50 MBPS</MenuItem>                        
                        <MenuItem value={"100 MBPS"}>100 MBPS</MenuItem>                        
                    </Select>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        halfWidth
                        id="qty"
                        label="Quantity"
                        name="qty"
                        autoComplete="qty"
                        onChange = {this.quantityChange}
                    />
                    <Button
                        halfWidth
                        variant="contained"
                        color="primary"
                        className="checkout"
                        type="submit"
                        onClick = {this.handleClick}
                    >
                        Check Out
                    </Button>
                </div>
            </Container>
        );
    }
    
}

export default CheckOut;