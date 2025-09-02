import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function HomePage() {
  const theme = useTheme();

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
      }}
    >
      <Typography variant="h4" color="white" gutterBottom>
        Welcome to Chatify!
      </Typography>
      <Typography variant="h6" color="white" textAlign="center" maxWidth={400}>
        Start by selecting a friend from your list to begin chatting. Your conversations are private and secure.
      </Typography>
    </Box>
  );
}

export default HomePage;
