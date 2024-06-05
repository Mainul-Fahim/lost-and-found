"use client"

import { getUserInfo, removeUser } from "@/services/auth.service";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";


const AuthButton = () => {
    const router = useRouter()
    const userInfo = getUserInfo()
 
    const handleLogOut = () => {
        removeUser()
        router.refresh()
    }
    return (
        <>
            {userInfo?.email? <Button color='error' onClick={handleLogOut}>Log Out</Button> :
                <Button component={Link} href='/login'>Log in</Button>}
        </>
    );
};

export default AuthButton;