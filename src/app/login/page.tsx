"use client"

import LFForm from "@/components/Forms/LFForm";
import LFInput from "@/components/Forms/LFInput";
import userLogin from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const validationSchema = z.object({
    email: z.string().email('Please enter a valid email address!'),
    password: z.string().min(6, 'Must be at least 6 characters'),
});

const LoginPage = () => {

    const [error, setError] = useState('');

    const router = useRouter()

    const handleLogin = async (values: FieldValues) => {

        try {
            const res = await userLogin(values)
            console.log(values, "res", res)
            if (res?.data?.token) {
                storeUserInfo(res?.data?.token)
                toast.success(res.message)
                router.replace("/", { duration: 2000 })
            }
            else {
                toast.error(res.message)
                setError(res.message);
            }
        }
        catch (err: any) {

            toast.error("something went wrong")
        }
    }


    return (
        <Container>
            <Stack sx={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{
                    maxWidth: 600,
                    width: "100%",
                    boxShadow: 1,
                    borderRadius: 1,
                    p: 4,
                    textAlign: "center"
                }}>
                    <Stack sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "5px"
                    }}>
                        {/* <Box> <Image src={assets.svgs.logo} alt='logo' width={50} height={50}></Image></Box> */}
                        <Box><Typography variant='h6' fontWeight={600}>Login! Lost and Found</Typography></Box>
                    </Stack>

                    {error && (
                        <Box>
                            <Typography
                                sx={{
                                    backgroundColor: 'red',
                                    padding: '1px',
                                    borderRadius: '2px',
                                    color: 'white',
                                    marginTop: '5px',
                                }}
                            >
                                {error}
                            </Typography>
                        </Box>
                    )}

                    <Box>
                        <LFForm
                            onSubmit={handleLogin}
                            resolver={zodResolver(validationSchema)}
                            defaultValues={{
                                email: '',
                                password: '',
                            }}
                        >
                            <Grid container spacing={2}>

                                <Grid item md={6} my={1}>
                                    <LFInput
                                        name='email'
                                        label='Email'
                                        type='email'
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item md={6} my={1}>
                                    <LFInput
                                        name='password'
                                        label='Password'
                                        type='password'
                                        fullWidth={true}
                                    />
                                </Grid>



                            </Grid>

                            <Link href={'/forgot-password'}>
                                <Typography
                                    mb={1}
                                    textAlign='end'
                                    component='p'
                                    fontWeight={300}
                                    sx={{
                                        textDecoration: 'underline',
                                    }}
                                >
                                    Forgot Password?
                                </Typography>
                            </Link>

                            <Button
                                sx={{
                                    margin: '10px 0px',
                                }}
                                fullWidth={true}
                                type='submit'
                            >
                                Login
                            </Button>
                            <Typography component='p' fontWeight={300}>
                                Don&apos;t have an account?{' '}
                                <Link href='/register'>Create an account</Link>
                            </Typography>
                        </LFForm>
                    </Box>
                </Box>




            </Stack>
        </Container>
    );
};

export default LoginPage;