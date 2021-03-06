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
import Paper from '@material-ui/core/Paper';
import api from '../util/api';
import { NavLink } from 'react-router-dom'

class ResourcesNoId extends React.Component {
    render() {
        return(
        <Container component="main" maxWidth="xl"
            style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start', justifyContent: 'center', paddingRight: '100px', paddingLeft: '100px'}}>
                <Typography component="h2" variant="h3" color="red" justifyContent="center">
                    Please select/create a project before continuing
                </Typography>
                <div style={{width: "100%", justifyContent: "center", display: "flex", padding: "50px"}}>
                    <Link justify="center" color="primary" component={NavLink} to="/projects" variant="h5">
                        Go To Project Management
                    </Link>
                </div>
        </Container>
        );
    }
}

class ResourcesWithId extends React.Component {
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
        this.checkoutHardware = this.checkoutHardware.bind(this);
        this.checkinHardware = this.checkinHardware.bind(this);
        this.getHardwareSet();
    }


    getHardwareSet(){
        api().get("/hardware/").then((res) => {
            let rData = {}
            res.data.forEach((hardwareItem, index) => {
                // let name =  "Hardware Set " + (index + 1);
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

    checkoutHardware(event) {
        const {auth, dispatch} = this.context;
        if(this.state.ResourceData[this.state.QuantityOutResource].Available - this.state.QuantityOut < 0) {
            alert("Not enough available resources!");
            return;
        } else {
            let requestBody = {
                project_id: this.context.state.projectOID,
                amount: parseInt(this.state.QuantityOut)
            }
            api().post('/hardware/check-out/' + this.state.ResourceData[this.state.QuantityOutResource]._id.$oid, requestBody)
                .catch((e) => {
                    if(e.response.status === 422) {
                        console.log("No project selected! Please select a project before attempting to checkout hardware")
                        alert("No project selected! Please select a project before attempting to checkout hardware");
                        dispatch({type: "CLEAR_PROJECT"});
                        return;
                    }
                    else if(e.response.status === 401) {
                        alert("Login expired, please login again.");
                        dispatch({type: "LOGOUT"});
                        return;
                    }
                })
                .then((res) => {
                    alert("Success!");
                    this.getHardwareSet();
                });
        }

    }

    checkinHardware(event) {
        const {auth, dispatch} = this.context;
        let requestBody = {
            project_id: this.context.state.projectOID,
            amount: parseInt(this.state.QuantityIn)
        }
        api().post('/hardware/check-in/' + this.state.ResourceData[this.state.QuantityInResource]._id.$oid, requestBody)
            .catch((e) => {
                if(e.response.status === 422) {
                    console.log("No project selected! Please select a project before attempting to checkout hardware")
                    alert("No project selected! Please select a project before attempting to checkout hardware");
                    dispatch({type: "CLEAR_PROJECT"});
                    return;
                }
                else if(e.response.status === 401) {
                    alert("Login expired, please login again.");
                    dispatch({type: "LOGOUT"});
                    return;
                }
            })
            .then((res) => {
                alert("Success!");
                this.getHardwareSet();
            });
    }

    render() {
        return(
            <Container component="main" maxWidth="xl"
            style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start', justifyContent: 'center', padding: '100px', paddingTop: '0px'}}>
                <Container style={{
                        justifyContent:'center', alignItems:'center',
                        margin: 'auto',
                        height: '30vh',
                        width: '50vw',
                        display: 'flex',
                        overflow: 'hidden',
                        flexDirection: 'column'}}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={8}>
                                <Paper elevation={10} style={{
                                            padding: '20px', 
                                            display: 'flex',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            flexDirection: 'column'}}>
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                                        <Typography variant="h6" >Resource: {this.state.SelectedResourceName}</Typography>
                                        <Typography>Capacity: {this.state.ResourceData[this.state.SelectedResourceName] ? this.state.ResourceData[this.state.SelectedResourceName].capacity : ""}</Typography>
                                    </div>
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                                        <Typography>Available: {this.state.ResourceData[this.state.SelectedResourceName] ? this.state.ResourceData[this.state.SelectedResourceName].available : ""}</Typography>
                                        <Typography>Price: {this.state.ResourceData[this.state.SelectedResourceName] ? this.state.ResourceData[this.state.SelectedResourceName].price : ""}</Typography>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <Paper elevation={10}
                                    style={{
                                                padding: '20px', 
                                                display: 'flex',
                                                backgroundColor: 'white',
                                                borderRadius: '5px',
                                                flexDirection: 'column'}}>
                                    <InputLabel id="demo-simple-select-label">Hardware Set</InputLabel>
                                    <Select 
                                    //style={{width: '200px', height: '40px'}}
                                    onChange = {this.resourceSelected}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    inputProps={{
                                        'data-testid': 'resourceSelect'
                                    }}>
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
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>    


                {/* The checkout */}
                <Container style={{
                        justifyContent:'center', alignItems:'center',
                        margin: 'auto',
                        height: '50vh',
                        width: '50vw',
                        display: 'flex',
                        overflow: 'hidden',
                        flexDirection: 'column'}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper elevation={10} style={{
                                        padding: '20px', 
                                        display: 'flex',
                                        backgroundColor: 'white',
                                        borderRadius: '5px',
                                        flexDirection: 'column'}}>
                                {/* <div className="quantity" style={{display: 'flex', flexDirection: 'column', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '45%'}}> */}
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                        Check Out
                                    </Typography>
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
                                        inputProps={{
                                            'data-testid': 'quantityOut'
                                        }}
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
                                        onClick = {this.checkoutHardware}
                                        data-testid="checkout"
                                    >
                                        Check Out
                                    </Button>
                                {/* </div> */}
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={6} lg={6}>
                            <Paper elevation={10}
                                   style={{
                                            padding: '20px', 
                                            display: 'flex',
                                            backgroundColor: 'white',
                                            borderRadius: '5px',
                                            flexDirection: 'column'}}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Check In
                            </Typography>
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
                                    inputProps={{
                                        'data-testid': 'quantityIn'
                                    }}
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
                                    onClick = {this.checkinHardware}
                                    data-testid="checkin"
                                >
                                    Check In
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>    
            </Container>
        );
    }
    
}

class Resources extends React.Component {
    static contextType = AuthContext;
    constructor(props) {    
        super(props);
        this.state = {
            hasProjectID: true
        }
    }

    componentDidMount() {
        const {auth, dispatch} = this.context;
        this.setState({
            hasProjectID: (this.context.state.projectOID != null && this.context.state.projectOID != undefined)
        });
        // if(this.context.state.projectOID != null && this.context.state.projectOID != undefined) {
        //     dispatch({type: "CLEAR_PROJECT"});
        //     return;
        // }
    }

    render() {
        return(
        <div className="wrapper">
            {this.state.hasProjectID ? <ResourcesWithId /> : <ResourcesNoId />}
        </div>
        );
    }
}

export default Resources;