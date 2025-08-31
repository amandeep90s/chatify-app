import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { loginSchema } from '@/validation/auth';

function SignInForm({ toggleLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onLoginFormSubmit = data => {
    console.log('Login data:', data);
    reset();
  };

  return (
    <>
      <Typography variant="h5">Login</Typography>

      <form onSubmit={handleSubmit(onLoginFormSubmit)} style={{ width: '100%', marginTop: '1rem' }}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          variant="outlined"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
          disabled={isSubmitting}
          autoComplete="off"
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          variant="outlined"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
          disabled={isSubmitting}
          autoComplete="off"
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: '1rem' }} fullWidth>
          Login
        </Button>

        <Typography textAlign="center" m={'1rem'}>
          OR
        </Typography>

        <Button type="button" variant="text" onClick={toggleLogin} fullWidth>
          Don't have an account? Sign Up
        </Button>
      </form>
    </>
  );
}

export default SignInForm;
