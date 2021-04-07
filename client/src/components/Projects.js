import './Projects.css';
import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Container from '@material-ui/core/Container';
import api from '../util/api';

class Projects extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            projectName: "",
            SelectedProjectName: "",
            RenderID: "",
            RenderDescription: "",
            id: "",
            description: ""
        };
        this.handleNewProj = this.handleNewProj.bind(this);
        this.quantityChange = this.quantityChange.bind(this);
        this.dropChange = this.dropChange.bind(this);
        this.projectSelected = this.projectSelected.bind(this);

    }
    quantityChange(event){
        const target = event.target.name;
        const val = event.target.value;
        this.setState({target: val});
    }
    dropChange(event){
        const hrdwr = event.target.value;
        this.setState({hardware: hrdwr})
    }
    projectSelected(e){
        let ProjectData = {
            "Project 1": {ID: 1, Description: "This is Project 1"},
            "Project 2": {ID: 2, Description: "This is Project 2"},
            "Project 3": {ID: 3, Description: "This is Project 3"},
            "Project 4": {ID: 4, Description: "This is Project 4"},
            "Project 5": {ID: 5, Description: "This is Project 5"}

        }
        this.setState({ProjectName: e.target.value});
        this.setState({ID: ProjectData[e.target.value].ID});
        this.setState({Description: ProjectData[e.target.value].Description}); 
    }


    handleNewProj(event) {
        const reqBody = {
            name: this.state.projectName,
            description: this.state.description
        };
        api.post('projects/', reqBody)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            });
    }
    render() {
        return(
            <Container component="main" maxWidth="xl"
            style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center', padding: '100px'}}>
                <div class="projectCard" style={{display: 'flex', justifyContent: 'flex-end', width: '100%', border: '1px solid #e4e4e4', padding: '20px', backgroundColor: '#dedede', height: '248px'}}>
                    <div style={{width: '750px', padding: '10px', backgroundColor: 'lightblue'}}>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                            <span>Project: {this.state.SelectedProjectName}</span>
                            <span>ID: {this.state.RenderID}</span>
                        </div>
                        <span>Description: {this.state.RenderDescription}</span>
                    </div>
                    <div className="quantity"  
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #e4e4e4', padding: '20px', borderRadius: '5px', backgroundColor: 'white', width: '250px'}}>
                    <InputLabel id="demo-simple-select-label">Projects</InputLabel>
                        <Select 
                        //style={{width: '200px', height: '40px'}}
                        onChange = {this.projectSelected}
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
                            onClick = {(e) => {
                                this.setState({SelectedProjectName: this.state.ProjectName});
                                this.setState({RenderID: this.state.ID})
                                this.setState({RenderDescription: this.state.Description})
                            }}
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
                            id="projectName"
                            label="Name"
                            name="projectName"
                            autoComplete="projectName"
                            onChange = {e => this.setState({projectName: e.target.value})}
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
                            onChange = {e => this.setState({id: e.target.value})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            halfWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            onChange = {e => this.setState({description: e.target.value})}
                        />
                        <Button
                            halfWidth
                            variant="contained"
                            color="primary"
                            className="resources"
                            type="submit"
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