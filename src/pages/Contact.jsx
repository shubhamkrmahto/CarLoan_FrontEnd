import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Link,
} from '@mui/material';
import { LocationOn, Email, Phone, Call } from '@mui/icons-material';

function Contact() {
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
      transition={{ duration: 0.4 }}
    >
      <Container maxWidth="md" sx={{ my: 5 }}>
        <Card elevation={4}>
          <CardContent>
            <Typography variant="h4" align="center" color="primary" gutterBottom>
              Contact Krushna Fincorp
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
              We’re here to help. Reach out to us anytime.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="flex-start">
                  <LocationOn color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6">Head Office</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Krushna Fincorp Pvt. Ltd.<br />
                      3rd Floor, Business Tower,<br />
                      FC Road, Shivaji Nagar,<br />
                      Pune, Maharashtra - 411005, India
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="flex-start">
                  <Email color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6">Email</Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Link href="mailto:support@krushnafincorp.in" underline="hover">
                        support@krushnafincorp.in
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Link href="mailto:financeserviceskrishna@gmail.com" underline="hover">
                        financeserviceskrishna@gmail.com
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <Link href="mailto:info@krushnafincorp.in" underline="hover">
                        info@krushnafincorp.in
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="flex-start">
                  <Phone color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6">Mobile Contact</Typography>
                    <Typography variant="body2" color="text.secondary">
                      +91 98765 43210<br />
                      +91 91234 56789
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="flex-start">
                  <Call color="primary" sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6">Landline</Typography>
                    <Typography variant="body2" color="text.secondary">
                      020-1234-5678<br />
                      020-8765-4321
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </motion.div>
  );
}

export default Contact;
