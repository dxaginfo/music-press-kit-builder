import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Showcase Your Music
              </Typography>
              <Typography variant="h5" paragraph>
                Create professional press kits that get attention from industry professionals
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                component={Link}
                to="/register"
                sx={{ mt: 2 }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Placeholder for hero image */}
              <Box sx={{ width: '100%', height: 350, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                {/* Image will go here */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Customizable Templates
              </Typography>
              <Typography variant="body1">
                Choose from multiple professionally designed templates to showcase your music and brand.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Music Integration
              </Typography>
              <Typography variant="body1">
                Easily embed your tracks from Spotify, SoundCloud, and other major platforms.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h5" component="h3" gutterBottom>
                Detailed Analytics
              </Typography>
              <Typography variant="body1">
                Track who's viewing your press kit and which content they're engaging with most.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
