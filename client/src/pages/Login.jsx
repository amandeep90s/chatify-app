import { Box, Container, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

import SignInForm from '@/components/forms/SignInForm';
import SignUpForm from '@/components/forms/SignUpForm';

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const theme = useTheme();

  const toggleLogin = () => {
    setIsLogin((prevValue) => !prevValue);
  };

  return (
    <Box
      sx={{
        background: theme.palette.background.login,
        minHeight: '100vh',
      }}
    >
      <Container
        component={'main'}
        maxWidth="xs"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isLogin ? <SignInForm toggleLogin={toggleLogin} /> : <SignUpForm toggleLogin={toggleLogin} />}
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginPage;
