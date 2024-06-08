"use client"

import LFInput from "@/components/Forms/LFInput";
import { registerUser } from "@/services/actions/registerUser";
import { storeUserInfo } from "@/services/auth.service";
import { Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LFForm from "@/components/Forms/LFForm";
import userLogin from "@/services/actions/userLogin";


const userValidationSchema = z.object({
  bio: z
    .string()
    .min(6, "Please enter your bio!"),
  age: z.number().min(1, "Please enter your age!"),
});

const validationSchema = z.object({
  name: z.string().min(1, "Please enter your name!"),
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
  profile: userValidationSchema,
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  profile: {
    bio: "",
    age: 20,
  },
};


const RegisterPage = () => {

  const router = useRouter()


  const handleRegister = async (values: FieldValues) => {

    console.log(values)
    try {
      const res = await registerUser(values)
      console.log(values)

      if (res?.data?.id) {
        toast.success(res.message)
        const userInfo = await userLogin({ password: values.password, email: values.email })
        if (userInfo?.data?.token) {
          storeUserInfo(userInfo?.data?.token)
          router.replace("/", { duration: 2000 })
        }
      }
      else {
        toast.error(res.message)
      }
    }
    catch (err: any) {
      toast.error("something went wrong")
    }
  }

  return (
    <Container>
      <Stack sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
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
            alignItems: "center"
          }}>
            {/* <Box> <Image src={assets.svgs.logo} alt='logo' width={50} height={50}></Image></Box> */}
            <Box><Typography variant='h6' fontWeight={600}>Register</Typography></Box>
          </Stack>


          <Box>
            <LFForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}>
              <Grid container spacing={2}
              >

                <Grid item md={12} my={1}>
                  <LFInput label="Name" fullWidth={true} name="name" />
                </Grid>
                <Grid item md={6} my={1}>
                  <LFInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid item md={6} my={1}>
                  <LFInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>

                <Grid item md={12} my={1}>
                  <LFInput
                    label="Bio"
                    fullWidth={true}
                    name="profile.bio"
                  />
                </Grid>
                {/* <Grid item md={6} my={1}>
                  <LFInput
                    label="Age"
                    type="number"
                    fullWidth={true}
                    name="profile.age"
                  />
                </Grid> */}

              </Grid>

              <Box my={4}><Button fullWidth type='submit'>Register</Button></Box>
              <Box><Typography component='p' fontWeight={400}>Do you already have an account? <Link href={"/login"}>Login</Link></Typography>
              </Box>
            </LFForm>
          </Box>
        </Box>


      </Stack>
    </Container>
  );
};

export default RegisterPage;