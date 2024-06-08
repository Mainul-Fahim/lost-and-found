"use client";

import { useGetMyClaimItemsQuery, useUpdateClaimStatusMutation } from '@/redux/api/claimApi';
import { EditNotifications } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridDeleteForeverIcon, GridDeleteIcon } from '@mui/x-data-grid';
import { useState } from 'react'
import { toast } from 'sonner';

const statusOptions = ['PENDING', 'APPROVED', 'REJECTED']

const MyClaimItems = () => {

    const { data, isLoading, refetch } = useGetMyClaimItemsQuery({})

    const [updateClaimStatus, { isLoading: updating }] = useUpdateClaimStatusMutation()


    const [selectedStatus, setSelectedStatus] = useState(''); // Initial state

    const handleStatusChange = async (event: any, id: string) => {
        setSelectedStatus(event.target.value);
        console.log(event.target.value)

        try {
            const res = await updateClaimStatus({ body: event.target.value, id });
            console.log(res)
            if (res) {
                toast.success("Status Updated successfully!");
                setSelectedStatus("")
                await refetch();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const claimItems = data?.claimItems?.claimItems;


    console.log(claimItems)


    const columns: GridColDef[] = [
        { field: "lostDate", headerName: "Lost Date", flex: 1 },
        {
            field: "distinguishingFeatures", headerName: "DistinguishingFeatures", flex: 1,
            renderCell: ({ row }) => (
                <Tooltip title={row.distinguishingFeatures}>
                    <Box sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.distinguishingFeatures.slice(0, 30) + (row.distinguishingFeatures.length > 30 ? '...' : '')}
                    </Box>
                </Tooltip>
            ),
        },
        // { field: "location", headerName: "Location", flex: 1 },
        {
            field: "status", headerName: "Status", flex: 1,
            renderCell: ({ row }) => {



                return (
                    <>

                        <Tooltip title={row.status}>
                            <Box>
                                <select style={{
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    padding: '5px 10px',
                                    cursor: 'pointer'
                                }} name="status" id="status" value={selectedStatus || row?.status} onChange={(e) => handleStatusChange(e, row.id)}>
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </Box>
                        </Tooltip >

                    </>
                )
            }
        },
      
    ];

    return (
        <Box>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid rows={claimItems} columns={columns} />
                </Box>
            ) : (
                <h1>Loading.....</h1>
            )}
        </Box>
    );
};

export default MyClaimItems;