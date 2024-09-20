import { Box, keyframes, Typography } from "@mui/material";
import logo from "../icons/logo.svg";
import React from "react";
import styled from "@emotion/styled";
import banner from '../img/bidhub-banner.png'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
    25%{
    transform: rotate(45deg)
    }
    50%{
    transform: rotate(0deg)
    }    75%{
    transform: rotate(-45deg)
    }
  to {
    transform: rotate(0deg);
  }
`;

const hideShow = keyframes`
    0% {
        scale: 0
    };
    50%{
        scale: 1
    }
    100% {
     scale: 0
    }
`;

const AnimatedBox = styled("div")({
  animation: `${hideShow} 3s infinite ease`,
});
export const CommingSoon = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
        <Box display={'flex'} gap={'1rem'}>
        <Typography variant="h2">
            Comming
        </Typography>
            <Typography variant="h2" color="primary.main">Soon</Typography>

        </Box>
      <AnimatedBox>
        <Box
          sx={{
            height: "10rem",
            width: ".5rem",
          }}
        >
          <Box width={"10rem"}>
            <img style={{ width: '8rem', borderRadius: '1.5rem'}} src={banner} alt="logo" />
          </Box>
        </Box>
      </AnimatedBox>
    </Box>
  );
};
