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
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../util/api';
import { AuthContext } from '../App';

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .trim()
        .required("First Name is required"),
    lastName: Yup.string()
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
                    token: `${values.firstName}-${values.lastName}-${values.email}`,
                    user: values.email
                }
            });
            return;
        } catch (e) {
            if(e.response.status === 409) {
                formik.setFieldError("email", "User already exists with this email");
                return;
            }
            else {
                formik.setFieldError("firstName", "Unable To Process Signup");
                formik.setFieldError("lastName", "Please Try Again");
                return;
            }
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: "", 
            lastName: "", 
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
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    onChange={formik.handleChange}
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
                    value={formik.values.lastName}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
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
// export class SignUp extends React.Component {

//     constructor(props) {
//         super(props);
//         formik.state = {
//             formValues: {
//                 firstName: "",
//                 lastName: "",
//                 email: "",
//                 password: ""
//             },
//             formErrors: {
//                 firstName: "",
//                 lastName: "",
//                 email: "",
//                 password: ""
//             },
//             formValues: {
//                 firstName: false,
//                 lastName: false,
//                 email: false,
//                 password: false
//             },
//             isSubmitting: false

            
//         };
//     }

//     attemptSignUp() {
//         //Basic form validation, should flesh formik out more
//         if(!(formik.state.firstName && formik.state.lastName && formik.state.email && formik.state.password)) {
//             alert('Please fill out form');
//         }
//         //Ping API and handle response/UI changes 
//         else {
//             formik.props.signUpUser(formik.state.email);
//             formik.setState({redirect: true});
//         }
        
//     }

//     handleChange(event) {
//         const name = event.target.name;
//         const value = event.target.value;

//         formik.setState({[name]: value});
//     }

//   render() {
//     if(formik.state.redirect) {
//         return ( <Redirect to="/" />);
//     }
//     return (
//         <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div className="signup">
//             <Typography component="h1" variant="h5">
//             Sign up
//             </Typography>
//             <Formik
//                 initialValues={{firstName: "", lastName: "", email: "", password: ""}}
//                 validationSchema={SignUpSchema}
//                 onSubmit={({ setSubmitting }) => {
//                     alert("Form is validated! Submitting the form...");
//                     setSubmitting(false);
//                 }}
//             >
//                 {({ touched, errors, isSubmitting }) => {

//                 }}

//             </Formik>
//             <form className="signup-form" onSubmit={() => formik.attemptSignUp()}>
//             <Grid container spacing={2} className="signup-grid">
//                 <Grid item xs={12} sm={6}>
//                 <TextField
//                     autoComplete="fname"
//                     name="firstName"
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="firstName"
//                     label="First Name"
//                     onChange={formik.handleChange}
//                 />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                 <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="lastName"
//                     label="Last Name"
//                     name="lastName"
//                     autoComplete="lname"
//                     onChange={formik.handleChange}
//                 />
//                 </Grid>
//                 <Grid item xs={12}>
//                 <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="email"
//                     label="Email Address"
//                     name="email"
//                     autoComplete="email"
//                     onChange={formik.handleChange}
//                 />
//                 </Grid>
//                 <Grid item xs={12}>
//                 <TextField
//                     variant="outlined"
//                     required
//                     fullWidth
//                     name="password"
//                     label="Password"
//                     type="password"
//                     id="password"
//                     autoComplete="current-password"
//                     onChange={formik.handleChange}
//                 />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button
//                     type="submit"
//                     fullWidth
//                     variant="contained"
//                     color="primary"
//                     className="signup-submit"
//                     >
//                 Sign Up
//             </Button>
//                 </Grid>
//             </Grid>
//             </form>
//         </div>
//         </Container>
//     );
//   }
// }