import React from 'react';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {FormControl, InputLabel, Select, Button, Box, List, ListItem, ListItemText, Menu, MenuItem, Grid} from '@material-ui/core';


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
    const classes = useStyles();
    const currentProject="test-project"
    return(
        <React.Fragment>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Project Info
            </Typography>
            <Typography component="h2" variant="h6" align="center" justify="center" gutterBottom>
                Current Project:
            </Typography>
            <Typography component="p" variant="h5" align="center" justify="center">
                { currentProject }
            </Typography>
            <div>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <FormControl variant="outlined" style={{marginTop: '10px', minWidth:'38%'}}>
                        <InputLabel id='project-select-label' variant="standard">Change Project</InputLabel>
                        <Select labelId='project-select-label' id='project-select' autoWidth variant="standard">
                            <MenuItem value="" >
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"test1"}>testProject1</MenuItem>
                            <MenuItem value={"test2"}>testProject2</MenuItem>
                            <MenuItem value={"test3"}>testProject3</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" style={{marginLeft: "10px", marginTop: '20px'}}>Go</Button>
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
  