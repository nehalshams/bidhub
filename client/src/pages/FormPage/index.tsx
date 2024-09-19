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
import { useNavigate, useParams } from "react-router-dom";
import { formValidator } from "../../utils/validation";
import { useLoginUserMutation, useSignupUserMutation } from "../../api";
import { toast } from "react-toastify";
import Banner from '../../img/bidhub-banner.png'
import FormLayout from "./FormLayout";

export default function FormPage() {
  const navigate = useNavigate();
  const params = useParams()
  console.log("🚀 ~ FormPage ~ params:", params)
  const [isSigninForm, setIsSigninForm] = React.useState(true);
  const [isPasswordType, setIsPasswordType] = React.useState(true);
  const [forgotPassword, setForgotPassword] = React.useState(false)

  const [formField, setFormField] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { firstName, lastName, email, password } = formField;

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
    if (resp?.data?.token) {
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('user', JSON.stringify(resp.data.user))
      navigate('/')
      window.location.reload()
    } else {
      toast.error('Something went wrong')
    }
  };

  const handleForgotPassword = () => {

  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = formField;
    const userData = JSON.stringify(formField);
    if (isSigninForm && email && password) {
      localStorage.setItem("user", userData);
      navigate("/");
    } else if (!isSigninForm && firstName && lastName && email && password) {
      const isValid = formValidator(formField);
      if (isValid) {
        console.log("🚀 ~ handleSubmit ~ isValid:", isValid)
        const resp = await signupUser(formField);
        setIsSigninForm(true);
        toast.success('Account created successfully.')
        setFormField({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      } else {
        toast.error('form is not valid.')
      }
    } else {
      alert("Not allowed");
    }
  };

  /* From https://css.glass */
  // background: rgba(255, 255, 255, 0.2);
  // border-radius: 16px;
  // box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  // backdrop-filter: blur(5px);
  // -webkit-backdrop-filter: blur(5px);
  // border: 1px solid rgba(255, 255, 255, 0.3);

  return (
    <FormLayout>
      <Typography component="h1" variant="h5">
        {isSigninForm ? "Sign In" : forgotPassword ? "Forgot Password" : "Sign up"}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={isSigninForm ? handleSignIn : forgotPassword ? handleForgotPassword : handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          {isSigninForm || forgotPassword ? (
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
                  size="small"
                  value={firstName}
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
                  size="small"
                  value={lastName}
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
              size="small"
              value={email}
            />
          </Grid>
          {
            forgotPassword ? <></>
              :
              <>
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
                    size="small"
                    value={password}
                  />
                </Grid>
                <Grid display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
                  <FormControlLabel
                    onClick={handlePasswordVisibility}
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="Show Password"
                  />
                  <Button onClick={() => {
                    setIsSigninForm(false)
                    setForgotPassword(true)
                  }}>Forgot Passord?</Button>
                </Grid>
              </>
          }
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        // onClick={handleFormSubmit}
        >
          {forgotPassword ? 'Send reset link' : isSigninForm ? "Sign In" : "Sign up"}
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
    </FormLayout>
  );
}
