import { Box, Button, Container, Stack, Typography } from '@mui/material';

const AllLostItems = async() => {
    
    const res = await fetch("https://lost-and-found-system-rose.vercel.app/api/lost-items", {
        next: {
          revalidate: 30,
        },
      });
      const { data: lostItems } = await res.json();
        console.log(lostItems);
    
    
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
                    {lostItems?.map((lost: any) => (
                        <Box
                            key={lost?.id}
                            sx={{
                                flex: 1,
                                width: "150px",
                                backgroundColor: "#B8D2CD",
                                border: "1px solid rgba(250, 250, 250, 1)",
                                borderRadius: "10px",
                                textAlign: "center",
                                padding: "40px 10px",
                                "&:hover": {
                                    border: "1px solid rgba(36, 153, 239, 1)",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    transition: "all 0.5s",
                                },
                            }}
                        >
                            <Typography component="p" fontWeight={600} fontSize={18} mt={2}>
                                    {lost.LostItemName}
                                </Typography>
                            <Box>
                                <Typography component="p" fontWeight={200} fontSize={14} mt={2}>
                                    {lost.description}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Container>
    );
};

export default AllLostItems;