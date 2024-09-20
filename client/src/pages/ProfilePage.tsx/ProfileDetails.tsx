import { Box, FormControl, Grid2, Input, TextField, Typography } from '@mui/material'
import React from 'react'
import BackgroundLetterAvatars from '../../components/Avatar'
import { getUser } from '../../utils/helper';
const ariaLabel = { 'aria-label': 'description' };
const ProfileDetails = () => {
    const user = getUser();
    const { firstName, lastName, email } = user || {}
    return (
        <Box>
            <Box sx={{ margin: "1rem auto" }} display={'flex'} justifyContent={'center'}>
                <BackgroundLetterAvatars name={`${firstName.toUpperCase()} ${lastName.toUpperCase()}` || 'N A'} />
            </Box>
            <Grid2 container spacing={2}>
                <Grid2 size={{ md: 6 }}>
                    <TextField
                        //   onChange={handleFormChange}
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
                </Grid2>
                <Grid2 size={{ md: 6 }}>
                    <TextField
                        //   onChange={handleFormChange}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        size="small"
                        value={lastName}
                    />
                </Grid2>
                <Grid2 size={{ md: 6 }}>
                    <Typography>Email:</Typography>
                </Grid2>
                <Grid2 size={{ md: 6 }}>

                    <FormControl variant="standard">
                        <Input id="component-simple" disabled defaultValue={email} />
                    </FormControl>

                </Grid2>
            </Grid2>
        </Box>
    )
}

export default ProfileDetails
