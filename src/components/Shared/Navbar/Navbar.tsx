import React from 'react';
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import dynamic from 'next/dynamic';

const Navbar = () => {
    
    const AuthButton = dynamic(() => import('@/components/Ui/authButton/AuthButton'), { ssr: false })

    return (
        <Container>
            <Stack
                py={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h4" component={Link} href="/" fontWeight={600}>
                    
                    <Box component="span" color="primary.main">
                        H
                    </Box>{" "}
                    Lost and Found
                </Typography>

                <Stack direction="row" justifyContent="space-between" gap={4}>
                    <Typography component={Link} href="/consultation">
                        Home
                    </Typography>
                    <Typography>About Us</Typography>
                    <Typography>Lost Items</Typography>
                    <Typography component={Link} href="/dashboard">Dashboard</Typography>
                </Stack>

                <AuthButton></AuthButton>
            </Stack>
        </Container>
    );
};

export default Navbar;