import './Resources.css';
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
import { AuthContext } from './AuthContext';
import api from '../util/api';

class Resources extends React.Component {
    static contextType = AuthContext;
    constructor(props) {    
        super(props);
        this.state = {
            ResourceName: "",
            SelectedResourceName: "",
            QuantityIn: 0,
            QuantityOut: 0,
            QuantityOutResource: "",
            QuantityInResource: "",
            ResourceData: {},
            ResourceDataArr: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.dropChange = this.dropChange.bind(this);
        this.resourceSelected = this.resourceSelected.bind(this);
        this.getHardwareSet = this.getHardwareSet.bind(this);
        this.getHardwareSet();
    }


    getHardwareSet(){
        api().get("/hardware/").then((res) => {
            let rData = {}
            res.data.forEach((hardwareItem, index) => {
                let name =  "Hardware Set " + (index + 1);
                rData[name] = hardwareItem;
            });
            let rDataArr = res.data.map((hardwareItem, index) => {
                hardwareItem.name =  "Hardware Set " + (index + 1);
                return hardwareItem;
            });
            this.setState({
                ResourceData: rData,
                ResourceDataArr: rDataArr
            });
        })
    }

    quantityChange(event){
        const qty = event.target.value;
        this.setState({quantity : qty})
    }
    dropChange(event){
        const hrdwr = event.target.value;
        this.setState({hardware: hrdwr})
    }

    resourceSelected(e){
        this.setState({ResourceName: e.target.value});
    }

    handleClick(event) {
        //api call with state quantity (this.state.quantity)
        console.log(this.state.quantity, this.state.hardware)
    }
    render() {
        return(
            <Container component="main" maxWidth="xl"
            style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center', padding: '100px'}}>
                <div class="resourceCard" style={{display: 'flex', justifyContent: 'space-between', width: '100%', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede', height: '248px'}}>
                    <div style={{width: '750px', padding: '10px', backgroundColor: 'lightblue'}}>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                            <span>Resource: {this.state.SelectedResourceName}</span>
                            <span>Capacity: {this.state.ResourceData[this.state.SelectedResourceName] ? this.state.ResourceData[this.state.SelectedResourceName].capacity : ""}</span>
                        </div>
                        <span>Available: {this.state.ResourceData[this.state.SelectedResourceName] ? this.state.ResourceData[this.state.SelectedResourceName].available : ""}</span>
                    </div>
                    <div className="quantity"  
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Hardware Set</InputLabel>
                        <Select 
                        //style={{width: '200px', height: '40px'}}
                        onChange = {this.resourceSelected}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select">
                             {this.state.ResourceDataArr.map((set, i) => <MenuItem value={set.name}>{set.name}</MenuItem>)}                  
                        </Select>
                        <Button
                            style={{marginTop: '10px'}}
                            halfWidth
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
                            onClick = {(e) => {
                                this.setState({SelectedResourceName: this.state.ResourceName});
                                this.setState({RenderID: this.state.ID})
                                this.setState({RenderAvailable: this.state.Available})
                            }}
                        >
                            See Info
                        </Button>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '50px', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede'}}>
                    <div className="quantity"
                    style={{display: 'flex', flexDirection: 'column', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Hardware Set</InputLabel>
                        <Select 
                        //style={{width: '200px', height: '40px'}}
                        onChange = {(e) => {
                            this.setState({QuantityOutResource: e.target.value})
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select">
                            {this.state.ResourceDataArr.map((set, i) => <MenuItem value={set.name}>{set.name}</MenuItem>)}                              
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
                            onChange = {(e) => {
                                this.setState({QuantityOut: e.target.value})
                            }}
                        />
                        <Button
                            halfWidth
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
                            onClick = {(e) => {
                                let updatedResourceData = this.state.ResourceData;
                                if(updatedResourceData[this.state.QuantityOutResource].Available - this.state.QuantityOut < 0){
                                    alert("");
                                }else{
                                    console.log(this.context.state.projectOID);
                                    let requestBody = {
                                        project_id: this.context.state.projectOID,
                                        amount: parseInt(this.state.QuantityOut)
                                    }
                                    api().post("/hardware/check-out/" +  this.state.ResourceData[this.state.SelectedResourceName]._id.$oid, requestBody).then((res) => {
                                        this.getHardwareSet();
                                    })
                                }

                            }}
                        >
                            Check Out
                        </Button>
                    </div>
                    <div className="quantity"
                    style={{display: 'flex', flexDirection: 'column', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Hardware Set</InputLabel>
                    <Select 
                        //style={{width: '200px', height: '40px'}}
                        onChange = {(e) => {
                            this.setState({QuantityInResource: e.target.value})
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select">
                            {this.state.ResourceDataArr.map((set, i) => <MenuItem value={set.name}>{set.name}</MenuItem>)}                          
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
                            onChange = {(e) => {
                                this.setState({QuantityIn: e.target.value})
                            }}
                        />
                        <Button
                            halfWidth
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
                            onClick = {(e) => {
                                let updatedResourceData = this.state.ResourceData;
                                console.log(this.context.state.projectOID);
                                let requestBody = {
                                    project_id: this.context.state.projectOID,
                                    amount: parseInt(this.state.QuantityIn)
                                }
                                api().post("/hardware/check-in/" +  this.state.ResourceData[this.state.SelectedResourceName]._id.$oid, requestBody).then((res) => {
                                    this.getHardwareSet();
                                })
                            }}
                        >
                            Check In
                        </Button>
                    </div>
                </div>
                
            </Container>
        );
    }
    
}

export default Resources;