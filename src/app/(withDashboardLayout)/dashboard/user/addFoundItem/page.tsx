'use client'

import LFForm from "@/components/Forms/LFForm";
import LFInput from "@/components/Forms/LFInput";
import LFSelectField from "@/components/Forms/LFSelectField";
import { useCreateFoundItemMutation, useGetAllFoundCategoriesQuery } from "@/redux/api/foundItemApi";
import { Button, Container, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";


const AddFoundItemPage = () => {

    const { data:categories, isLoading } = useGetAllFoundCategoriesQuery(undefined)

    console.log(categories)

    const categoryNames = categories?.map((category:any)=>category?.name)

    console.log(categoryNames)

    const [createFoundItem] = useCreateFoundItemMutation()

    const handleFormSubmit = async (values: FieldValues) => {
        
        console.log(values);

        const categoryId = categories?.find((category:any)=>category?.name === values?.categoryId)

        values.categoryId = categoryId?.id

        console.log("after categoryid",values);
 
        try {
            const res = await createFoundItem(values).unwrap();
            if (res) {
                toast.success("Found Item added successfully!");
                
              }
        } catch (err: any) {
            console.error(err);
        }
    };

    const defaultValues = {
        foundItemName:"",
        description: "",
        location: "",
        categoryId: "",
    };

    return (
        <Container>
            <h1>Add Found Item</h1>
            <LFForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
                <Grid container spacing={2} sx={{ my: 5 }}>
                    <Grid item xs={12} sm={12} md={4}>
                        <LFInput
                            name="foundItemName"
                            label="Item Name"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <LFInput
                            name="description"
                            type="string"
                            label="description"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} md={4}>
                        <LFInput
                            name="location"
                            label="Location"
                            fullWidth={true}
                            sx={{ mb: 2 }}
                        />
                    </Grid>
  
                    <Grid item xs={12} sm={12} md={4}>
                        <LFSelectField
                            items={categoryNames || []}
                            name="categoryId"
                            label="Item Category"
                            sx={{ mb: 2 }}
                        />
                    </Grid>


                </Grid>

                <Button type="submit">Create</Button>
            </LFForm>
        </Container>
    );
};

export default AddFoundItemPage;