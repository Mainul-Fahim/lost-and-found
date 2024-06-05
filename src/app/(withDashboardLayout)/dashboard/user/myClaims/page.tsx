"use client";

import { useGetMyClaimItemsQuery } from '@/redux/api/claimApi';
import { useGetMyFoundItemsQuery } from '@/redux/api/foundItemApi';
import { useGetMyLostItemsQuery } from '@/redux/api/lostItemApi';
import { EditNotifications } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridDeleteForeverIcon, GridDeleteIcon } from '@mui/x-data-grid';
import Link from 'next/link';


const MyClaimItems = () => {

    const { data, isLoading } = useGetMyClaimItemsQuery({})

    const claimItems = data?.claimItems?.claimItems;
    const meta = data?.meta;

    console.log(claimItems)

    const handleDelete = async (id: string) => {
        try {
            //   const res = await deleteSpecialty(id).unwrap();
            //   if (res?.id) {
            //     toast.success("Specialty deleted successfully!!!");
            //   }
        } catch (err: any) {
            console.error(err.message);
        }
    };

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
        { field: "status", headerName: "Status", flex: 1 },
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                return (
                    <Box>
                        <IconButton
                            onClick={() => handleDelete(row.id)}
                            aria-label="delete"
                        >
                            <GridDeleteForeverIcon sx={{ color: "red" }} />
                        </IconButton>
                        <Link href={`/dashboard/admin/edit/${row.id}`}>
                            <IconButton aria-label="delete">
                                <EditNotifications />
                            </IconButton>
                        </Link>
                    </Box>
                );
            },
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