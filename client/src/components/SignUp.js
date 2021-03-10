import './SignUp.css';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

export class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    attemptSignUp() {
        //Basic form validation, should flesh this out more
        if(!(this.state.firstName && this.state.lastName && this.state.email && this.state.password)) {
            alert('Please fill out form');
        }
        //Ping API and handle response/UI changes 
        else {
            this.props.signUpUser(this.state.email);
            this.setState({redirect: true});
        }
        
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value});
    }

  render() {
    if(this.state.redirect) {
        return ( <Redirect to="/" />);
    }
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="signup">
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className="signup-form" onSubmit={() => this.attemptSignUp()}>
            <Grid container spacing={2} className="signup-grid">
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={this.handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={this.handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                />
                </Grid>
                <Grid item xs={12} spacing={1}>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="signup-submit"
                    >
                Sign Up
            </Button>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
    );
  }
}