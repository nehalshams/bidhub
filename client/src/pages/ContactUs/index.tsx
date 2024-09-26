import { Box, Button, CardContent, TextField, Typography } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'
import TextArea from '../../components/TextArea'
import Navbar from '../Layout/Navbar'
import { useSendContactMsgMutation } from '../../api'
import { toast } from 'react-toastify'

const ContactUs = () => {

    const [sendMessage] = useSendContactMsgMutation()
    const [ state, setState] = useState({
        textArea: "",
        name: "",
        email: ""
    })
    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setState({...state, [name]: value})
    }
    const handleSendMsg = async() => {
        const { textArea, name, email} = state
        const resp = await sendMessage({
            message: textArea,
            name,
            email
        })
        console.log("🚀 ~ handleSendMsg ~ resp:", resp)
        if('error' in resp){

        }else {
            toast.success('We got your message, Thanks for contacting us.')
        }
    }
    console.log("🚀 ~ ContactUs ~ state:", state)
    return (
        <Box display={'flex'} justifyContent={'center'} pt={'2rem'}>
            <Navbar/>
            <Box sx={{ maxWidth: { xs: '100%', md: "75vw" }, display: 'flex', alignItems: 'center' }}>
                <CardContent>
                    <Typography gutterBottom variant="h1" component="div">
                        Contact Us
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>

                    </Typography>
                </CardContent>
                <Box sx={{ margin: '5rem' }} bgcolor={'primary.light'} display={'flex'} flexDirection={'column'} gap={'1rem'} p={'2rem'} borderRadius={'1rem'}>
                    <TextField
                          onChange={handleFormChange}
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        size="small"
                    //   value={firstName}
                    />
                    <TextField
                          onChange={handleFormChange}

                        name="email"
                        required
                        fullWidth
                        id="email"
                        label="email"
                        size="small"
                    //   value={firstName}
                    />
                    <TextArea handleChange={handleFormChange} placeholder={'Message'}/>

                    <Button onClick={handleSendMsg} variant='contained'>
                        Send
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default ContactUs
