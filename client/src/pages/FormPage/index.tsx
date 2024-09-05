import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { formValidator } from "../../utils/validation";
import { useLoginUserMutation, useSignupUserMutation } from "../../api";

export default function FormPage() {
  const navigate = useNavigate();
  const [isSigninForm, setIsSigninForm] = React.useState(true);
  const [isPasswordType, setIsPasswordType] = React.useState(true);

  const [formField, setFormField] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [signupUser] = useSignupUserMutation();
  const [loginUser] = useLoginUserMutation();

  const handleFormType = () => {
    setIsSigninForm(!isSigninForm);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordType(!isPasswordType);
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormField({ ...formField, [name]: value });
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const resp = await loginUser({ email: formField.email, password: formField.password });
    if(resp.data.token){
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('user', JSON.stringify(resp.data.user))
      navigate('/dashboard')
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = formField;
    const userData = JSON.stringify(formField);
    if (isSigninForm && email && password) {
      localStorage.setItem("user", userData);
      navigate("/dashboard");
    } else if (!isSigninForm && firstName && lastName && email && password) {
      const isValid = formValidator(formField);
      if (isValid) {
        const resp = await signupUser(formField);
        setIsSigninForm(true);
        setFormField({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      } else {
        // toas
      }
    } else {
      alert("Not allowed");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSigninForm ? "Sign In" : "Sign up"}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={isSigninForm ? handleSignIn : handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {isSigninForm ? (
              <></>
            ) : (
              <>
                <Grid size={{ md: 6 }}>
                  <TextField
                    onChange={handleFormChange}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    onChange={handleFormChange}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
              </>
            )}
            <Grid size={12}>
              <TextField
                onChange={handleFormChange}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                onChange={handleFormChange}
                required
                fullWidth
                name="password"
                label="Password"
                type={isPasswordType ? "password" : "text"}
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid>
              <FormControlLabel
                onClick={handlePasswordVisibility}
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Show Password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={handleFormSubmit}
          >
            {isSigninForm ? "Sign In" : "Sign up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid>
              <Button onClick={handleFormType}>
                {isSigninForm
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
