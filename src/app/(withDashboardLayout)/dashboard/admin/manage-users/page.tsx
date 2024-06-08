'use client'

import LFForm from "@/components/Forms/LFForm";
import LFSelectField from "@/components/Forms/LFSelectField";
import { useGetAllUsersQuery, useUpdateActiveStatusMutation } from "@/redux/api/authApi";
import { Box, Button, Grid } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ManageUsers = () => {

    const status = ['ACTIVATED', 'DEACTIVATED']

    const { data, isLoading, refetch } = useGetAllUsersQuery({})
    const [ updateActiveStatus, { isLoading: updating } ] = useUpdateActiveStatusMutation()

    const allUsers = data?.users;

    console.log(allUsers, data)

    const handleStatusChange = async (userId:string, isActive:boolean) => {
        // try {
        //   const response = await axios.patch(`/api/users/${userId}`, { isActive });
        //   setUsers(users.map(user => (user.id === userId ? { ...user, isActive: response.data.isActive } : user)));
        // } catch (error) {
        //   console.error('Error updating user status:', error);

        // }
        console.log(isActive,userId)
        try {
            const res = await updateActiveStatus({ body: isActive, userId });
            console.log(res)
            if (res) {
                toast.success("Status Updated successfully!");
                await refetch();
              }
         } catch (error) {
            console.log(error);
         }
    };

    const handleFormSubmit = async (values: FieldValues) => {

        console.log(values);


        try {

        } catch (err: any) {
            console.error(err);
        }
    };

    const defaultValues = {
        isActive: "",
    };


    const columns: GridColDef[] = [
        { field: "name", headerName: "Name", flex: 1 },
        {
            field: "email", headerName: "Email", flex: 1,
        },
        { field: "role", headerName: "Role", flex: 1 },
        {
            field: "isActive", headerName: "IsActive", flex: 1,
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <input
                            style={{cursor:'pointer'}}
                            type="checkbox"
                            checked={row?.isActive}
                            onChange={() => handleStatusChange(row?.id, !row?.isActive)}
                        />
                    </Box>
                );
            },
        },
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

export default ManageUsers;