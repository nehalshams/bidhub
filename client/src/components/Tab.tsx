import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProfileDetails from '../pages/ProfilePage.tsx/ProfileDetails';
import { Button } from '@mui/material';
import UserAuctionTable from '../pages/ProfilePage.tsx/UserAuctionTable';
import { useNavigate } from 'react-router-dom';
import UserBidsTable from '../pages/ProfilePage.tsx/UserBidsTable';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BaseTabs() {
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered aria-label="basic tabs example">
                    <Tab label="My Profile" {...a11yProps(0)} />
                    <Tab label="My Auctions" {...a11yProps(1)} />
                    <Tab label="My Bids" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} gap={'3rem'}>
                    <ProfileDetails />
                    <Button variant='outlined' onClick={() => navigate('/')}>Back</Button>

                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <Box display={'flex'} mt={'2rem'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'3rem'}>
                    <UserAuctionTable />
                    <Button variant='outlined' onClick={() => navigate('/')}>Back</Button>
                </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <Box display={'flex'} mt={'2rem'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={'3rem'}>
                    <UserBidsTable />
                    <Button variant='outlined' onClick={() => navigate('/')}>Back</Button>
                </Box>
            </CustomTabPanel>
        </Box>
    );
}
