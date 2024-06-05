"use client";

import { useGetMyLostItemsQuery } from '@/redux/api/lostItemApi';
import { EditNotifications } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridDeleteForeverIcon, GridDeleteIcon } from '@mui/x-data-grid';
import Link from 'next/link';


const MyLostItems = () => {

    const { data, isLoading } = useGetMyLostItemsQuery({})

    const lostItems = data?.lostItems?.lostItems;
    const meta = data?.meta;

    console.log(lostItems)

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
        { field: "LostItemName", headerName: "Lost Item Name", flex: 1 },
        {
            field: "description", headerName: "Description", flex: 1,
            renderCell: ({ row }) => (
                <Tooltip title={row.description}>
                    <Box sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.description.slice(0, 30) + (row.description.length > 30 ? '...' : '')}
                    </Box>
                </Tooltip>
            ),
        },
        { field: "location", headerName: "Location", flex: 1 },
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
                        <Link href={`/dashboard/admin/doctors/edit/${row.id}`}>
                            <IconButton aria-label="delete">
                                <EditNotifications />
                            </IconButton>
                        </Link>
                    </Box>
                );
            },
        },
    ];

    const rows = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];


    return (
        <Box>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid rows={lostItems} columns={columns} />
                </Box>
            ) : (
                <h1>Loading.....</h1>
            )}
        </Box>
    );
};

export default MyLostItems;