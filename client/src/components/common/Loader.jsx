import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  gap: theme.spacing(2),
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiCircularProgress-circle': {
    strokeLinecap: 'round',
  },
}));

const LoaderText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 500,
  textAlign: 'center',
}));

const Loader = ({ message = 'Loading...' }) => {
  return (
    <LoaderContainer>
      <StyledCircularProgress size={48} thickness={4} />
      <LoaderText variant="body1">{message}</LoaderText>
    </LoaderContainer>
  );
};

export default Loader;
