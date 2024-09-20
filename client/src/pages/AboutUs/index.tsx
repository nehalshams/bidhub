import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

export default function AboutUs() {
    return (
        <Box display={'flex'} justifyContent={'center'} pt={'2rem'}>
            <Card sx={{ maxWidth: { xs: '100%', md: "75vw" }, display: { xs: 'block', xl: 'flex'}, alignItems: 'center' }}>
                <CardContent>
                    <Typography whiteSpace={'nowrap'} gutterBottom variant="h1" component="div">
                        About Us
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    </Typography>
                </CardContent>
                <Box sx={{ margin: '5rem' }} bgcolor={'primary.light'} p={'2rem'} borderRadius={'1rem'}>
                    <Typography variant='h4'>Who We Are</Typography>
                    <Typography color='primary' fontWeight={500}>
                        Welcome to [BidHub], a leading online marketplace for domain auctions. Founded in [2024], we are dedicated to connecting buyers and sellers in a secure and user-friendly environment. Our platform empowers individuals and businesses to buy, sell, and bid on premium domain names.

                    </Typography>
                    <Box sx={{ margin: '1rem' }} bgcolor={'primary.light'} p={'2rem'} borderRadius={'1rem'}>
                        <Typography variant='h4'>Our Mission</Typography>
                        <Typography color='primary' fontWeight={500}>
                            At [BidHub], our mission is to simplify the domain auction process, making it accessible and transparent for everyone. We strive to provide an efficient and enjoyable experience for our users, ensuring that every auction is fair and every transaction is secure.
                        </Typography>
                        <Box sx={{ margin: '1rem' }} bgcolor={'primary.light'} p={'2rem'} borderRadius={'1rem'}>
                            <Typography variant='h4'>What we offer</Typography>
                            <Typography color='primary' fontWeight={500}>
                                <ul>
                                    <li>
                                       <b>Wide Selection of Domains: </b> Browse a diverse range of premium domain names across various categories, from technology to lifestyle, ensuring there's something for everyone.
                                    </li>
                                    <li>
                                        <b>Secure Bidding Process: </b>Our platform employs robust security measures to protect your data and transactions, giving you peace of mind as you bid on your desired domains.
                                    </li>
                                    <li>
                                        <b>User-Friendly Interface: </b>Designed with you in mind, our intuitive platform makes it easy to navigate, whether you're a first-time bidder or an experienced seller.
                                    </li>
                                    <li>
                                        <b>Support and Resources: </b>Our dedicated support team is here to help you at every step. We also provide resources, guides, and tips to help you make informed decisions.
                                    </li>
                                </ul>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
}
