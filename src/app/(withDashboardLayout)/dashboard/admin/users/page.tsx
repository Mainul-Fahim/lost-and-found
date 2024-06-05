"use client";

import { useGetAllUsersQuery } from '@/redux/api/authApi';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridDeleteForeverIcon, GridDeleteIcon } from '@mui/x-data-grid';
import Link from 'next/link';

const Users = () => {
    
    const { data, isLoading } = useGetAllUsersQuery({})

    const allUsers = data?.users;

    console.log(allUsers,data)

 
    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        {
            field: "email", headerName: "Email", flex: 1,
        },
        { field: "role", headerName: "Role", flex: 1 },
        { field: "isActive", headerName: "IsActive", flex: 1 },
    ];
    
    return (
        <Box>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid rows={allUsers} columns={columns} />
                </Box>
            ) : (
                <h1>Loading.....</h1>
            )}
        </Box>
    );
};

export default Users;