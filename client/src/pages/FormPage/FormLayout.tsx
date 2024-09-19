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
    <Container component="main" maxWidth="xs">
      <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#d67976"
      }}>
        <Box sx={{ xs: '100vw', md: '50vw' }} display={'flex'} justifyContent={'center'}>
          <img style={{ width: '', objectFit: 'contain' }} alt="logo" src={Banner} />
        </Box>
      </Box>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#e0e0e090",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          zIndex: 99999999,
          position: "relative",
          opacity: .9,
          padding: '1rem',
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
