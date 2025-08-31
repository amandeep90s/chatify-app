import { Button, TextField, Typography } from '@mui/material';

function SignInForm({ toggleLogin }) {
  return (
    <>
      <Typography variant="h5">Login</Typography>

      <form style={{ width: '100%', marginTop: '1rem' }}>
        <TextField fullWidth required label="Username" margin="normal" variant="outlined" />

        <TextField fullWidth required type="password" label="Password" margin="normal" variant="outlined" />

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
