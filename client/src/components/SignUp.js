import './SignUp.css';
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../util/api';
import { AuthContext } from './AuthContext';

const SignUpSchema = Yup.object().shape({
    first_name: Yup.string()
        .trim()
        .required("First Name is required"),
    last_name: Yup.string()
        .trim()
        .required("Last Name is required"),
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

export const SignUp = (props) => {
    const { dispatch } = React.useContext(AuthContext);

    const attemptSignUp = async (values) => {
        try{
            let res = await api.post('users/register', values);
            dispatch({
                type: "LOGIN",
                payload: {
                    token: res.data.token.replace(/['"]+/g, ''),
                    user: values.email
                }
            });
            return;
        } catch (e) {
            if(!e.response) {
                formik.setFieldError("email", "CORS issue");
                return;
            }
            else if(e.response.status === 409) {
                formik.setFieldError("email", "User already exists with this email");
                return;
            }
            else {
                formik.setFieldError("first_name", "Unable To Process Signup");
                formik.setFieldError("last_name", "Please Try Again");
                return;
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            first_name: "", 
            last_name: "", 
            email: "", 
            password: ""
        },
        validationSchema: SignUpSchema,
        onSubmit: async (values) => {
            attemptSignUp(values);
            formik.setSubmitting(false);
        },
    });

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="signup">
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className="signup-form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} className="signup-grid">
                <Grid item xs={12} sm={6}>
                <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="first_name"
                    label="First Name"
                    value={formik.values.first_name}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                    helperText={formik.touched.first_name && formik.errors.first_name}
                    onChange={formik.handleChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    autoComplete="lname"
                    value={formik.values.last_name}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    helperText={formik.touched.last_name && formik.errors.last_name}
                    onChange={formik.handleChange}
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
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
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
                    value={formik.values.password}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    onChange={formik.handleChange}
                />
                </Grid>
                <Grid item xs={12}>
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