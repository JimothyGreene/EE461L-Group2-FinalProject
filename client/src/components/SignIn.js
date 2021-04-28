import './SignIn.css';
import React from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import api from '../util/api';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { AuthContext } from './AuthContext';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),
    password: Yup.string()
        .trim()
        // .min(8, "Password must be 8 characters at minimum")
        // .matches(/[a-z]/, "Password requires at least 1 lowercase letter")
        // .matches(/[A-Z]/, "Password requires at least 1 uppercase letter")
        // .matches(/\d/, "Password requires at least 1 number")
        .required("Password is required")
});

export const SignIn = (props) => {
    const { state, dispatch } = React.useContext(AuthContext);

    const attemptSignIn = async (values) => {
        try{
            let res = await api().post('users/login', values);
            dispatch({
                type: "LOGIN",
                payload: {
                    token: res.data.token.replace(/['"]+/g, ''),
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