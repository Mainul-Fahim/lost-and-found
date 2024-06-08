import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import found from '@/assets/landing_page/lostandfound.jpg'

const About = () => {
    return (
        <Container disableGutters sx={{mt:5}}>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" component="h2" className="about-title">
                        Reunite with What Matters: The Story Behind Lost & Found
                    </Typography>
                    <CardContent className="about-content">
                        <Typography variant="body1">
                            Lost & Found is more than just a platform for finding lost items. Its
                            a community built on the belief that even the smallest belonging can
                            hold immense sentimental value. We understand the heartache of losing
                            something cherished, and our mission is to empower communities to come
                            together and help reunite people with what they ve lost.
                        </Typography>
                        <Typography variant="body1" className="about-mission">
                            **Our Mission:** To foster a user-friendly platform for reporting lost
                            and found items, encouraging collaboration, and igniting a sense of
                            community through the simple act of returning lost objects. We believe
                            that by working together, we can create a world where lost items find
                            their way back home and a sense of joy is restored.
                        </Typography>
                        <Button
                            variant="outlined"
                            // href="/about-us"
                            sx={{mt:2}}
                        >
                            Learn More
                        </Button>
                    </CardContent>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent className="team-info">

                            <div className="team-member">
                                <Image
                                    src={found}
                                    alt="Team Member 1"
                                    className="team-member-image"
                                />

                            </div>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default About;