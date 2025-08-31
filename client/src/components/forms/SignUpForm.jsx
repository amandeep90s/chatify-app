import { zodResolver } from '@hookform/resolvers/zod';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import { Avatar, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { VisuallyHiddenInput } from '@/components/styles/StyledComponents';
import { signUpSchema } from '@/validation/auth';

function SignUpForm({ toggleLogin }) {
  const [avatarPreview, setAvatarPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      bio: '',
      username: '',
      password: '',
      avatar: null,
    },
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Set the value for form validation
      setValue('avatar', event.target.files, { shouldValidate: true });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Clear if no file selected
      setValue('avatar', null, { shouldValidate: true });
      setAvatarPreview(null);
    }
  };

  const onSignUpFormSubmit = (data) => {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('bio', data.bio);
    formData.append('username', data.username);
    formData.append('password', data.password);

    if (data.avatar && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]);
    }

    reset();
    setAvatarPreview(null);
  };

  return (
    <>
      <Typography variant="h5">Sign Up</Typography>

      <form onSubmit={handleSubmit(onSignUpFormSubmit)} style={{ width: '100%', marginTop: '1rem' }}>
        <Stack position={'relative'} width={'10rem'} margin={'auto'}>
          <Avatar sx={{ width: '10rem', height: '10rem', objectFit: 'contain' }} src={avatarPreview} />

          <IconButton
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              color: 'white',
              bgcolor: 'rgba(0,0,0,0.5)',
              ':hover': {
                bgcolor: 'rgba(0,0,0,0.7)',
              },
            }}
            component={'label'}
          >
            <>
              <CameraAltIcon />
              <VisuallyHiddenInput type="file" accept="image/*" onChange={handleAvatarChange} />
            </>
          </IconButton>
        </Stack>

        {errors.avatar && (
          <Typography variant="caption" color="error" display="block" textAlign="center" sx={{ mt: 1 }}>
            {errors.avatar.message}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Name"
          margin="normal"
          variant="outlined"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ''}
          disabled={isSubmitting}
          autoComplete="off"
        />

        <TextField
          fullWidth
          label="Bio"
          margin="normal"
          variant="outlined"
          {...register('bio')}
          error={!!errors.bio}
          helperText={errors.bio ? errors.bio.message : ''}
          disabled={isSubmitting}
        />

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
        />

        <Button type="submit" variant="contained" color="primary" sx={{ mt: '1rem' }} size="large" fullWidth>
          Sign Up
        </Button>

        <Typography textAlign="center" m={'1rem'}>
          OR
        </Typography>

        <Button type="button" variant="text" onClick={toggleLogin} fullWidth>
          Already have an account? Login
        </Button>
      </form>
    </>
  );
}

export default SignUpForm;
