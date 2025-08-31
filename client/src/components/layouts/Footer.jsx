import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2, 3),
  textAlign: 'center',
  marginTop: 'auto',
  flexShrink: 0, // Prevent footer from shrinking
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    bottom: 0,
  },
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

function Footer() {
  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <FooterText variant="body2">
          &copy; {new Date().getFullYear()} Chatify. Built with React &amp; Material-UI
        </FooterText>
      </Container>
    </FooterContainer>
  );
}

export default Footer;
