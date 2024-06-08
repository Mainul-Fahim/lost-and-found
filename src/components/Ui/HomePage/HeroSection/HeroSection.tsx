"use client"

import { Button, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import hero from '@/assets/landing_page/hero.jpg'
import Link from 'next/link';
import { getUserInfo } from '@/services/auth.service';

const HeroSection = () => {
    
    const userInfo = getUserInfo()

    const route = userInfo?.email ? '/dashboard' : '/login'
    
    return (
        <Container>
            <div className="relative h-screen bg-gray-100">

                <div className="absolute inset-0">
                    <Image
                        src={hero}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        alt="Background Image"
                    />
                    <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>


                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                    <h1 className="text-4xl font-bold mb-6">Find what you lost, reunite what you found!</h1>
                    <div className="flex space-x-4">
                        <Link href={`${route}`}>
                            <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700">
                                Report a Lost Item
                            </Button>
                        </Link>
                        <Link href={`${route}`}>
                            <Button variant="contained" color="secondary" className="bg-green-500 hover:bg-green-700">
                                Report a Found Item
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default HeroSection;