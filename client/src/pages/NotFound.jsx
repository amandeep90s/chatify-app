import { ArrowBack, Home as HomeIcon } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router';

const NotFoundContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

const ErrorCodeText = styled(Typography)(({ theme }) => ({
  fontSize: '8rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  lineHeight: 0.8,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    fontSize: '6rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '4rem',
  },
}));

const ErrorTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const ErrorDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  maxWidth: '500px',
  lineHeight: 1.6,
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.shape.borderRadius,
  fontWeight: 500,
  textTransform: 'none',
  minWidth: '140px',
  [theme.breakpoints.down('sm')]: {
    minWidth: 'unset',
    width: '100%',
  },
}));

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <NotFoundContainer maxWidth="md">
      <ErrorCodeText variant="h1">404</ErrorCodeText>
      <ErrorTitle variant="h2">Page Not Found</ErrorTitle>
      <ErrorDescription variant="body1">
        Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong
        URL. Let's get you back to chatting!
      </ErrorDescription>

      <ButtonGroup>
        <StyledButton variant="contained" color="primary" startIcon={<HomeIcon />} onClick={handleGoHome}>
          Go Home
        </StyledButton>
        <StyledButton variant="outlined" color="primary" startIcon={<ArrowBack />} onClick={handleGoBack}>
          Go Back
        </StyledButton>
      </ButtonGroup>
    </NotFoundContainer>
  );
};

export default NotFound;
