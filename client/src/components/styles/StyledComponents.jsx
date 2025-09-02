import { styled } from '@mui/material';

export const VisuallyHiddenInput = styled('input')({
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

export const InputBox = styled('input')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
  },
}));
