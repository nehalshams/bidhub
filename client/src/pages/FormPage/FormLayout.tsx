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

type Props = {
    children: React.ReactNode;
}

const FormLayout = ({ children } : Props) => {
  return (
    <Container sx={{ padding: '4rem'}} component="main" maxWidth="sm">
      <CssBaseline />
      <Box sx={{ position: 'fixed'}}>
        <Typography variant="h1" letterSpacing={'2rem'} color="primary.main">BidHub</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: '4rem',
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          zIndex: 99999999,
          position: "relative",
          opacity: .9,
          borderRadius: '1rem'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        { children }
      </Box>
    </Container>
  )
}

export default FormLayout
