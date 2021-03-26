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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../util/api';
import axios from 'axios';
import { AuthContext } from '../App';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .trim()
        .min(8, "Password must be 8 characters at minimum")
        .matches(/[a-z]/, "Password requires at least 1 lowercase letter")
        .matches(/[A-Z]/, "Password requires at least 1 uppercase letter")
        .matches(/\d/, "Password requires at least 1 number")
        .required("Password is required")
});

export const SignIn = (props) => {
    const { dispatch } = React.useContext(AuthContext);

    const attemptSignIn = async (values) => {
        try{
            let res = await api.post('users/login', values);
            dispatch({
                type: "LOGIN",
                payload: {
                    token: res.data.token,
                    user: values.email
                }
            });
            return;
        } catch (e) {
            if(e.response.status === 401) {
                formik.setFieldError("password", "Password Incorrect");
            }
            else {
                formik.setFieldError("email", "No account with this email");
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "", 
            password: ""
        },
        validationSchema: SignInSchema,
        onSubmit: async (values) => {
            attemptSignIn(values);
            formik.setSubmitting(false);
        },
    });

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="signin">
            <Typography component="h1" variant="h5" className="signin-text">
                Sign in
            </Typography>
            <form className="signin-form" onSubmit={formik.handleSubmit}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
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
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
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


// export class SignIn extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             redirect: false,
//             emailError: false,
//             emailErrorMessage: '',
//             passwordError: false,
//             passwordErrorMessage: '',
//             isValid: true
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSignIn = this.handleSignIn.bind(this);
//         this.validateInputs = this.validateInputs.bind(this);

//     }

//     handleChange(event) {
//         const name = event.target.name;
//         const value = event.target.value;

//         this.setState({[name]: value});
//     }

//     validateInputs(inpEmail, inpPassword) {
//         var stateChanges = {
//             emailError: false,
//             emailErrorMessage: '',
//             passwordError: false,
//             passwordErrorMessage: '',
//             isValid: true
//         };
//         var isValidInp = true;
        
//         //See if an email and password have been entered
//         if(!inpEmail) {
//             console.log("no email");
//             stateChanges['emailError'] = true;
//             stateChanges['emailErrorMessage'] = 'Please enter an email';
//             isValidInp = false;
//         }
//         if(!inpPassword) {
//             console.log("no pw");
//             stateChanges['passwordError'] = true;
//             stateChanges['passwordErrorMessage'] = 'Please enter a password';
//             isValidInp = false;
//         }
        
//         //Check validity of email and password
//         //I'm not quite sure why this line works but it does, some weird JS regular expression
//         if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inpEmail))) {
//             console.log("invalid email");
//             stateChanges['emailError'] = true;
//             stateChanges['emailErrorMessage'] = 'Please enter a valid email';
//             isValidInp = false;
//         }
//         if(inpPassword.length >= 8) {
//             let isValidPassword = true;
//             let pwErrorMsg = "Password must contain ";
//             if(!(/\d/.test(this.state.password))) {
//                 isValidPassword = false;
//                 pwErrorMsg.concat("at least 1 number");
//             }
//             if(!(/[a-z]/.test(this.state.password))) {
//                 if(isValidPassword) {
//                     isValidPassword = false;
//                     pwErrorMsg.concat("at least 1 lowercase letter");
//                 }
//                 else {
//                     pwErrorMsg.concat(", at least 1 lowercase letter");
//                 }
//             }
//             if(!(/[A-Z]/.test(this.state.password))) {
//                 if(isValidPassword) {
//                     isValidPassword = false;
//                     pwErrorMsg.concat("at least 1 uppercase letter");
//                 }
//                 else {
//                     pwErrorMsg.concat(", at least 1 uppercase letter");
//                 }
//             }
//             if(!isValidPassword) {
//                 console.log("pw missing characters");
//                 stateChanges['passwordError'] = true;
//                 stateChanges['passwordErrorMessage'] = pwErrorMsg;
//                 isValidInp = false;
//             }
//         }
//         else {
//             console.log("pw too short");
//             stateChanges['passwordError'] = true;
//             stateChanges['passwordErrorMessage'] = 'Password must be at least 8 characters';
//             isValidInp = false;
//         }

//         stateChanges['isValid'] = isValidInp;
//         return stateChanges
//     }

//     handleSignIn() {
//         const inpEmail = this.state.email;
//         const inpPassword = this.state.password;
//         const stateChanges = this.validateInputs(inpEmail, inpPassword);
//         this.setState(stateChanges);
//         if(stateChanges.isValid) {
//             this.props.signInUser(inpEmail);
//         }

//     }
  
//     render() {
//     }
//   }