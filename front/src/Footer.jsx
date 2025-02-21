import React from 'react';
import { Box, Container, Typography, IconButton, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 1, // Reduced padding
        px: 2,
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(0, 0, 0, 0.2)' 
          : 'rgba(0, 0, 0, 0.03)',
        borderTop: '1px solid',
        borderColor: theme.palette.mode === 'dark' 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'rgba(0, 0, 0, 0.05)',
        position: 'sticky', // Make footer stick to bottom
        bottom: 0,
        width: '100%',
        zIndex: 10,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '40px', // Fixed height for compact footer
          }}
        >
          <Typography
            variant="caption" // Smaller text
            color="text.secondary"
          >
            © {currentYear} Street Workout Partner
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}> {/* Reduced gap */}
            <IconButton
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                padding: 0.5, // Smaller padding
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                padding: 0.5,
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton
              href="mailto:your@email.com"
              size="small"
              sx={{
                padding: 0.5,
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <EmailIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
