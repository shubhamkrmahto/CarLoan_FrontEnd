import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Box,
} from '@mui/material';

const blogs = [
  {
    id: 1,
    title: 'Understanding Car Loan Interest Rates',
    snippet:
      'Learn how car loan interest rates work and how to get the best deal for your financing.',
    date: 'May 10, 2025',
    url: '/blogs/car-loan-interest-rates',
  },
  {
    id: 2,
    title: '5 Tips to Improve Your Loan Eligibility',
    snippet:
      'Discover practical steps you can take to boost your chances of loan approval at Krushna Fincorp.',
    date: 'April 25, 2025',
    url: '/blogs/loan-eligibility-tips',
  },
  {
    id: 3,
    title: 'Benefits of Choosing Krushna Fincorp for Your Car Loan',
    snippet:
      'Explore why Krushna Fincorp stands out among car finance providers with affordable rates and quick approvals.',
    date: 'April 10, 2025',
    url: '/blogs/why-krushna-fincorp',
  },
  {
    id: 4,
    title: 'How to Apply for a Car Loan Online',
    snippet:
      'A step-by-step guide to applying for your car loan on our secure and user-friendly platform.',
    date: 'March 30, 2025',
    url: '/blogs/how-to-apply-online',
  },
  {
    id: 5,
    title: 'Car Loan vs Personal Loan: Which One is Better?',
    snippet:
      'Understand the differences between car loans and personal loans to make the right choice for your needs.',
    date: 'March 15, 2025',
    url: '/blogs/car-vs-personal-loan',
  },
];

function Blogs() {
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          Krushna Fincorp Blog
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          paragraph
        >
          Stay updated with the latest news, tips, and insights about car loans,
          finance, and how Krushna Fincorp can help you drive your dream car.
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={4}>
          {blogs.map(({ id, title, snippet, date, url }) => (
            <Grid item xs={12} sm={6} md={4} key={id}>
              <Card
                elevation={3}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {snippet}
                  </Typography>
                </CardContent>
                <Box sx={{ px: 2, pb: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: 'block', mb: 1 }}
                  >
                    {date}
                  </Typography>
                  <CardActions sx={{ p: 0 }}>
                    <Button
                      size="small"
                      color="primary"
                      href={url}
                      sx={{ textTransform: 'none' }}
                    >
                      Read More
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </motion.div>
  );
}

export default Blogs;
