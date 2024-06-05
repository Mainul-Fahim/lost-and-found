import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const lost = [{
    title: 'Nid',
    subTitle: 'National Id card is lost',
},
{
    title: 'Money Bag',
    subTitle: 'Money bag is lost',
},
{
    title: 'Jacket',
    subTitle: 'Leather Jacket is lost',
},
{
    title: 'Bat',
    subTitle: 'Cricket Bat is lost',
},
{
    title: 'Phone',
    subTitle: 'Samsung s20 mobile phone is lost',
}
]

const LostItems = () => {
    return (
        <Container>
            <Box
                sx={{
                    margin: "80px 0px",
                    textAlign: "center"
                }}
            >
                <Box
                    sx={{
                        textAlign: "start",
                    }}
                >
                    <Typography variant="h4" fontWeight={600}>
                        Recent Lost Items Reports
                    </Typography>
                    <Typography component="p" fontWeight={300} fontSize={18} mt={1}>
                        Lost Items
                    </Typography>
                </Box>
                <Stack direction="row" gap={4} mt={5}>
                    {lost.map((lost: any,index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                width: "150px",
                                backgroundColor: "lightgray",
                                border: "1px solid rgba(250, 250, 250, 1)",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "40px 10px",
                                "& img": {
                                    width: "50px",
                                    height: "50px",
                                    margin: "0 auto",
                                },
                                "&:hover": {
                                    border: "1px solid rgba(36, 153, 239, 1)",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    transition: "all 0.5s",
                                },
                            }}
                        >
                            <Typography component="p" fontWeight={600} fontSize={18} mt={2}>
                                    {lost.title}
                                </Typography>
                            <Box>
                                <Typography component="p" fontWeight={200} fontSize={14} mt={2}>
                                    {lost.subTitle}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
                <Button
                    variant="outlined"
                    sx={{
                        marginTop: "20px",
                    }}
                >
                    View ALL
                </Button>
            </Box>
        </Container>
    );
};

export default LostItems;