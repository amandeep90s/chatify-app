import { Avatar, Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { memo } from 'react';

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'self-start',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create(['box-shadow', 'transform'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: theme.shadows[2],
    transform: 'translateY(-1px)',
  },
}));

const IconContainer = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '& .MuiSvgIcon-root': {
    fontSize: '1.25rem',
  },
}));

const ContentContainer = styled(Stack)({
  flex: 1,
  minWidth: 0, // Allows text truncation
});

const HeadingText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const DescriptionText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  lineHeight: 1.4,
}));

function ProfileCard({ heading, description, icon: Icon, color = 'primary' }) {
  return (
    <ProfileContainer>
      {Icon && (
        <IconContainer sx={{ backgroundColor: `${color}.main` }}>
          <Icon />
        </IconContainer>
      )}

      <ContentContainer spacing={0.5}>
        <HeadingText variant="body1" title={heading}>
          {heading}
        </HeadingText>
        <DescriptionText variant="body2" title={description}>
          {description}
        </DescriptionText>
      </ContentContainer>
    </ProfileContainer>
  );
}

export default memo(ProfileCard);
