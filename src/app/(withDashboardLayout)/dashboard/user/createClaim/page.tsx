'use client'

import LFForm from '@/components/Forms/LFForm';
import LFInput from '@/components/Forms/LFInput';
import LFSelectField from '@/components/Forms/LFSelectField';
import { useCreateClaimMutation } from '@/redux/api/claimApi';
import { useGetAllFoundItemsQuery } from '@/redux/api/foundItemApi';
import { Button, Container, Grid } from '@mui/material';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';

const CreateClaim = () => {

    const { data: foundItems, isLoading } = useGetAllFoundItemsQuery(undefined)

    console.log(foundItems)

    const foundItemsNames = foundItems?.map((foundItem: any) => foundItem?.foundItemName)

    console.log(foundItemsNames)

    const [createClaim] = useCreateClaimMutation()

    const handleFormSubmit = async (values: FieldValues) => {

        console.log(values);

        const lostDate = new Date(values.lostDate);
        const isoDateString = lostDate.toISOString();

        const foundItemId = foundItems?.find((foundItem: any) => foundItem?.foundItemName === values?.foundItemId)

        values.foundItemId = foundItemId?.id
        values.lostDate = isoDateString

        console.log("after foundItemId", values);

        try {
            const res = await createClaim(values).unwrap();
            if (res) {
                toast.success("Claim added successfully!");

            }
        } catch (err: any) {
            console.error(err);
        }
    };

    const defaultValues = {
        foundItemId: "",
        distinguishingFeatures: "",
        lostDate: "",
    };

    return (
        <Container>
            <h1>Add Claim Item</h1>
            <LFForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
                <Grid container spacing={2} sx={{ my: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                        <LFSelectField
                            items={foundItemsNames || []}
                            name="foundItemId"
                            label="Found Item Name"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <LFInput
                            name="distinguishingFeatures"
                            type="string"
                            label="distinguishingFeatures"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <LFInput
                            name="lostDate"
                            type="date"
                            // label="lostDate"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                </Grid>

                <Button type="submit">Create</Button>
            </LFForm>
        </Container>
    );
};

export default CreateClaim;