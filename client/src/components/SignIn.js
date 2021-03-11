import './SignIn.css';
import React from "react";
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

export class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            redirect: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({[name]: value});
    }

    onSubmit() {
        //Basic validation, should flesh this out more
        if(!this.state.email || !this.state.password) {
            alert("Please enter email and password");
        }
        //Ping API and handle response
        else {
            this.props.signInUser(this.state.email);
            this.setState({redirect: true});
        }
    }
  
    render() {
        if(this.state.redirect) {
            return ( <Redirect to="/" />);
        }
      return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className="signin">
            <Typography component="h1" variant="h5" className="signin-text">
                Sign in
            </Typography>
            <form className="signin-form" onSubmit={this.onSubmit}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={this.handleChange}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
                />
                <Button
                fullWidth
                variant="contained"
                color="primary"
                className="signin-submit"
                type="submit"
                >
                Sign In
                </Button>
            </form>
            </div>
        </Container>
      );
    }
  }