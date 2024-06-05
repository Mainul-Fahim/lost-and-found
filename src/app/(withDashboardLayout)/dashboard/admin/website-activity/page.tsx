'use client'


import { useGetWebsiteActivityQuery } from "@/redux/api/authApi";
import { Box, Typography } from "@mui/material";


const WebsiteActivity = () => {

    const { data, isLoading } = useGetWebsiteActivityQuery({})



    console.log(data)

    const getColor = (value: any) => value > 50 ? 'error.main' : 'success.main'; 

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '50%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="span" sx={{ color: getColor(data?.lostItems) }}>Lost Items</Typography>
                <Typography variant="h4" component="span">{data?.lostItems}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="span" sx={{ color: getColor(data?.foundItems) }}>Found Items</Typography>
                <Typography variant="h4" component="span">{data?.foundItems}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="span" sx={{ color: getColor(data?.claimItems) }}>Claims</Typography>
                <Typography variant="h4" component="span">{data?.claimItems}</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h6" component="span" sx={{ color: getColor(data?.reunionCount) }}>Claims</Typography>
                <Typography variant="h4" component="span">{data?.reunionCount}</Typography>
            </Box>
        </Box>
    );
};

export default WebsiteActivity;