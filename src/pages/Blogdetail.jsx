import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Box,
  Divider,
  Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

// Sample blog data — ideally fetch from API or context in real app
const blogPosts = {
  'car-loan-interest-rates': {
    title: 'Understanding Car Loan Interest Rates',
    date: 'May 10, 2025',
    content: `
      <p>Understanding interest rates on car loans is crucial to making an informed decision when financing your vehicle.</p>
      <p>Interest rates can be fixed or variable and depend on factors like your credit score, loan term, and lender policies.</p>
      <h3>Types of Interest Rates</h3>
      <ul>
        <li><strong>Fixed interest rate:</strong> Remains the same throughout the loan tenure.</li>
        <li><strong>Variable interest rate:</strong> Can change based on market conditions.</li>
      </ul>
      <p>Choosing the right interest rate type can save you thousands over the life of your loan.</p>
    `,
  },
  'loan-eligibility-tips': {
    title: '5 Tips to Improve Your Loan Eligibility',
    date: 'April 25, 2025',
    content: `
      <p>Getting approved for a car loan can be easier if you follow these five simple tips:</p>
      <ol>
        <li>Maintain a good credit score.</li>
        <li>Keep your debt-to-income ratio low.</li>
        <li>Provide accurate and complete documentation.</li>
        <li>Build a stable employment history.</li>
        <li>Choose a realistic loan amount.</li>
      </ol>
      <p>At Krushna Fincorp, we review all factors to help you get the best possible financing.</p>
    `,
  },
  // Add more blog posts as needed...
};

function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blog = blogPosts[slug];

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  if (!blog) {
    return (
      <Container sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h5" color="error" align="center">
          Blog post not found.
        </Typography>
        <Box textAlign="center" mt={3}>
          <Button variant="contained" onClick={() => navigate('/blogs')}>
            Back to Blogs
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Published on {blog.date}
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Box
          sx={{ mb: 5 }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <Button variant="contained" onClick={() => navigate('/blogs')}>
          Back to Blogs
        </Button>
      </Container>
    </motion.div>
  );
}

export default BlogDetail;
