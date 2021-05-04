import './Projects.css';
import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import api from '../util/api';
import { AuthContext } from './AuthContext';

class Projects extends React.Component {
    static contextType = AuthContext;

    constructor(props) { 
        super(props);
        this.state = {
            currProjectName: "",
            currProjectID: "",
            currProjectDescription: "",
            newProjectName: "",
            newId: "",
            newDescription: "",
            allProjects: [],
            selectedProjectID: "",
            selectedProjectName: "",
            joinId: "",
            joinError: false,
            currProjectHardware: [],
            joinHelperText: ""
        };
        this.handleNewProj = this.handleNewProj.bind(this);
        this.projectSelected = this.projectSelected.bind(this);
        this.switchProject = this.switchProject.bind(this);
        this.joinById = this.joinById.bind(this);

    }

    getProjects() {
        if(this.state.currProjectID !== null && this.state.currProjectID !== undefined) {
            api().get(`projects/${this.state.currProjectID.replace(/['"]+/g, '')}`)
                .then((res) => {
                    this.setState({
                        currProjectName: res.data.name.replace(/['"]+/g, ''),
                        currProjectID: res.data.project_id.replace(/['"]+/g, ''),
                        currProjectDescription: res.data.description.replace(/['"]+/g, ''),
                        currProjectHardware: res.data.hardware
                    })
                })
                .catch((e) => {
                    console.log(e)
                });
        }
        api().get('projects/')
            .then((res) => {
                this.setState({allProjects: res.data});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.setState({
            allProjects: [],
            joinError: false,
            joinHelperText: ""
        });
        if(this.context.state.projectID !== null && this.context.state.projectID !== undefined) {
            api().get(`projects/${this.context.state.projectID.replace(/['"]+/g, '')}`)
                .then((res) => {
                    this.setState({
                        currProjectName: res.data.name.replace(/['"]+/g, ''),
                        currProjectID: res.data.project_id.replace(/['"]+/g, ''),
                        currProjectDescription: res.data.description.replace(/['"]+/g, ''),
                        currProjectHardware: res.data.hardware
                    })
                })
                .catch((e) => {
                    console.log(e)
                });
        }
        api().get('projects/')
            .then((res) => {
                this.setState({allProjects: res.data});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    projectSelected(e){
        this.setState({
            selectedProjectName: e.target.value,
            selectedProjectID: e.currentTarget.id

        });
    }
    switchProject(e) {
        
        this.setState({
            currProjectName: this.state.selectedProjectName,
            currProjectID: this.state.selectedProjectID
        });
        if(this.state.selectedProjectID !== null && this.state.selectedProjectID !== undefined) {
            api().get(`projects/${this.state.selectedProjectID.replace(/['"]+/g, '')}`)
                .then((res) => {
                    this.setState({
                        currProjectName: res.data.name.replace(/['"]+/g, ''),
                        currProjectID: res.data.project_id.replace(/['"]+/g, ''),
                        currProjectDescription: res.data.description.replace(/['"]+/g, ''),
                        currProjectHardware: res.data.hardware
                    });
                    this.updateProject({
                        projectName: res.data.name,
                        projectID: res.data.project_id,
                        projectOID: res.data._id.$oid,
                        hardware: res.data.hardware
                    });
                })
                .catch((e) => {
                    console.log(e)
                });
        }
        api().get('projects/')
            .then((res) => {
                this.setState({allProjects: res.data});
            })
            .catch((e) => {
                console.log(e);
            });
    }


    handleNewProj() {
        const reqBody = {
            name: this.state.newProjectName,
            description: this.state.newDescription,
            project_id: this.state.newId
        };
        api().post('projects/', reqBody)
            .then((res) => {
                this.updateProject({
                    projectName: res.data.name,
                    projectID: res.data.project_id,
                    projectOID: res.data._id.$oid,
                    hardware: res.data.hardware
                });
                this.setState({
                    currProjectName: res.data.name,
                    currProjectID: res.data.project_id,
                    newProjectName: "",
                    newId: "",
                    newDescription: ""
                });

            })
            .catch((err) => {
                console.log(err)
            })
            .then(() => {
                this.getProjects();
            });
    }

    updateProject(proj) {
        const { auth, dispatch } = this.context;
        dispatch({
            type: "PROJECT",
            payload: {
                name: proj.projectName,
                id: proj.projectID,
                oid: proj.projectOID,
                hardware: proj.hardware
            }
        });
    }

    joinById() {
        api().get(`projects/${this.state.joinId}`)
            .then((res) => {
                this.updateProject({
                    projectName: res.data.name.replace(/['"]+/g, ''),
                    projectID: res.data.project_id.replace(/['"]+/g, ''),
                    projectOID: res.data._id.$oid.replace(/['"]+/g, ''),
                    hardware: res.data.hardware
                });
                this.setState({
                    currProjectName: res.data.name.replace(/['"]+/g, ''),
                    currProjectID: res.data.project_id.replace(/['"]+/g, ''),
                    currProjectDescription: res.data.description.replace(/['"]+/g, ''),
                    currProjectHardware: res.data.hardware,
                    joinError: false,
                    joinHelperText: ""
                });
            })
            .catch((e) => {
                if(e.response !== null && e.response !== undefined) {
                    this.setState({
                        joinError: true,
                        joinHelperText: e.response.data.msg.replace(/['"]+/g, '')
                    });
                } else {
                    this.setState({
                        joinError: true,
                        joinHelperText: "Invalid ID"
                    });
                }
                
            });
        api().get('projects/')
            .then((res) => {
                this.setState({allProjects: res.data});
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        return(
            <Container component="main" maxWidth="xl"
            style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'flex-start', justifyContent: 'center', paddingRight: '100px', paddingLeft: '100px'}}>
                <div class="projectCard" style={{display: 'flex', justifyContent: 'flex-end', width: '100%', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede', height: '248px'}}>
                    <div style={{width: '750px', padding: '10px', backgroundColor: 'lightblue'}}>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                            <span>Current Project Info</span>
                        </div>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                            <span>Project: {this.state.currProjectName}</span>
                            <span>ID: {this.state.currProjectID}</span>
                        </div>
                        <span>Description: {this.state.currProjectDescription}</span>
                    </div>
                    <div className="quantity"  
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '250px'}}>
                    <InputLabel id="projSelectLabel">Projects</InputLabel>
                        <Select 
                        //style={{width: '200px', height: '40px'}}
                        onChange = {this.projectSelected}
                        labelId="projectSelect"
                        id="projectSelect"
                        inputProps={{
                            'data-testid': 'projectSelect'
                        }}>
                            {this.state.allProjects.map(proj => {
                                return(
                                    <MenuItem id={proj.project_id.replace(/['"]+/g, '')} value={proj.name.replace(/['"]+/g, '')}>
                                        {proj.name.replace(/['"]+/g, '')}
                                    </MenuItem>
                                );
                            })}                       
                        </Select>
                        <Button
                            style={{marginTop: '10px'}}
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
                            onClick = {this.switchProject}
                        >
                            Switch Project
                        </Button>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede'}}>
                    <div className="quantity"
                    style={{display: 'flex', flexDirection: 'column', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '1000px'}}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap justifyContent="center" align="center">
                            Join By ID
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            halfWidth
                            id="joinId"
                            label="ID"
                            value={this.state.joinId}
                            name="joinId"
                            autoComplete="newId"
                            error={this.state.joinError}
                            helperText={this.state.joinHelperText}
                            inputProps={{
                                'data-testid': 'joinProjectText'
                            }}
                            onChange = {e => this.setState({joinId: e.target.value})}
                        />
                        <Button
                            halfWidth
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
                            data-testid="joinProjectButton"
                            onClick = {this.joinById}
                        >
                            Join Project
                        </Button>
                    </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede'}}>
                    <div className="quantity"
                    style={{display: 'flex', flexDirection: 'column', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '1000px'}}>
                        <Typography component="h1" variant="h6" color="inherit" noWrap justifyContent="center" align="center">
                            Create New Project
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            halfWidth
                            id="newProjectName"
                            label="Name"
                            value={this.state.newProjectName}
                            name="newProjectName"
                            autoComplete="newProjectName"
                            inputProps={{
                                'data-testid': 'newProjectName'
                            }}
                            onChange = {e => this.setState({newProjectName: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            halfWidth
                            id="newId"
                            label="ID"
                            value={this.state.newId}
                            name="newId"
                            autoComplete="newId"
                            inputProps={{
                                'data-testid': 'newProjectID'
                            }}
                            onChange = {e => this.setState({newId: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            halfWidth
                            id="newDescription"
                            label="Description"
                            value={this.state.newDescription}
                            name="newDescription"
                            autoComplete="newDescription"
                            inputProps={{
                                'data-testid': 'newProjectDesc'
                            }}
                            onChange = {e => this.setState({newDescription: e.target.value})}
                        />
                        <Button
                            halfWidth
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
                            data-testid="newProjectButton"
                            onClick = {this.handleNewProj}
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