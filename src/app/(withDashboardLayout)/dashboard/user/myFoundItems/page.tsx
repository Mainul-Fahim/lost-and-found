"use client";

import { useDeleteFoundItemMutation, useGetMyFoundItemsQuery } from '@/redux/api/foundItemApi';
import { EditNotifications } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridDeleteForeverIcon, GridDeleteIcon } from '@mui/x-data-grid';
import Link from 'next/link';
import { toast } from 'sonner';


const MyFoundItems = () => {

    const { data, isLoading } = useGetMyFoundItemsQuery({})

    const foundItems = data?.foundItems?.foundItems;

    // const [deleteFoundItem] = useDeleteFoundItemMutation()

    console.log(foundItems)

    // const handleDelete = async (id: string) => {
    //     try {
    //         const res = await deleteFoundItem(id).unwrap();
    //         if (res?.id) {
    //             toast.success("Found Item Report deleted successfully!!!");
    //         }
    //     } catch (err: any) {
    //         console.error(err.message);
    //     }
    // };

    const columns: GridColDef[] = [
        { field: "foundItemName", headerName: "Found Item Name", flex: 1 },
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
        // { field: "status", headerName: "Status", flex: 1 },
        // {
        //     field: "action",
        //     headerName: "Action",
        //     flex: 1,
        //     headerAlign: "center",
        //     align: "center",
        //     renderCell: ({ row }) => {
        //         return (
        //             <Box>
        //                 <IconButton
        //                     onClick={() => handleDelete(row.id)}
        //                     aria-label="delete"
        //                 >
        //                     <GridDeleteForeverIcon sx={{ color: "red" }} />
        //                 </IconButton>
                      
        //             </Box>
        //         );
        //     },
        // },
    ];

    return (
        <Box>
            {!isLoading ? (
                <Box my={2}>
                    <DataGrid rows={foundItems} columns={columns} />
                </Box>
            ) : (
                <h1>Loading.....</h1>
            )}
        </Box>
    );
};

export default MyFoundItems;