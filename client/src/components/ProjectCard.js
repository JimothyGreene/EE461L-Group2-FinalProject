import React, { useEffect, useState, useContext } from 'react';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormControl, InputLabel, Select, Button, Box, List, ListItem, ListItemText, Menu, MenuItem, Grid} from '@material-ui/core';
import { AuthContext } from './AuthContext';
import api from '../util/api';


function preventDefault(event) {
    event.preventDefault();
  }

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        alignItems: "center"
    },
    root: {
        backgroundColor: theme.palette.background.paper,
    }
}));

export default function ProjectCard() {
  const { state, dispatch } = useContext(AuthContext);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({})

  const classes = useStyles();

  useEffect(() => {
    setAllProjects([]);
    api().get('projects/')
            .then((res) => {
                setAllProjects(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
  }, [selectedProject]);

  const onClick = (e) => {
    dispatch({
      type: "PROJECT",
      payload: {
        name: selectedProject.selectedName,
        id: selectedProject.selectedID,
        oid: selectedProject.selectedOID
      }
    });
  }

  return(
      <React.Fragment>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Project Info
          </Typography>
          <Typography component="h2" variant="h6" align="center" justify="center" gutterBottom>
              Current ProjectID:
          </Typography>
          <Typography component="p" variant="h5" align="center" justify="center">
          {(state.projectID !== null && state.projectID !== 'undefined') ? `${state.projectID.replace(/['"]+/g, '')}` : ''}
          </Typography>
          <div>
              <Box display="flex" justifyContent="center" alignItems="center">
                  <FormControl variant="outlined" style={{marginTop: '10px', minWidth:'38%'}}>
                      <InputLabel id='project-select-label' variant="standard">Change Project</InputLabel>
                      <Select labelId='project-select-label' id='project-select' autoWidth variant="standard"
                        onChange={(e) => {
                          setSelectedProject({
                            selectedID: e.currentTarget.id,
                            selectedName: e.target.value,
                            selectedOID: e.currentTarget.dataset.objectID
                          })
                        }}
                      >
                        {allProjects.map(proj => {
                            return(
                                <MenuItem id={proj.project_id.replace(/['"]+/g, '')} value={proj.name.replace(/['"]+/g, '')} data-objectID={proj._id.$oid.replace(/['"]+/g, '')}>
                                    {proj.name.replace(/['"]+/g, '')}
                                </MenuItem>
                            );
                        })}
                      </Select>
                  </FormControl>
                  <Button variant="contained" color="primary" style={{marginLeft: "10px", marginTop: '20px'}} onClick={onClick}>Go</Button>
              </Box>
              
          </div>
          <div style={{marginLeft: "auto", width: "100%", marginRight: "0", justifyContent: "flex-end", display: "flex", marginTop: '20px'}}>
              <Link justify="flex-start" color="primary" component={NavLink} to="/projects">
                  Project Info
              </Link>
          </div>
      </React.Fragment> 
  );
}

const options = [
    'Nothing',
    'Change Project',
    'test-project-1',
    'test-project-2',
    'test-project-3',
  ];
  
  function SimpleListMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
  
    const handleClickListItem = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setAnchorEl(null);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div className={classes.root}>
        <List component="nav" aria-label="Device settings">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            onClick={handleClickListItem}
          >
            <ListItemText primary={options[selectedIndex]} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={option}
              disabled={index === 0}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
  