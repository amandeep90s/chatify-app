import { AlternateEmail, CalendarMonth, Face as FaceIcon, Person } from '@mui/icons-material';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { memo } from 'react';

import ProfileCard from '@/components/app/ProfileCard';

dayjs.extend(relativeTime);

const ProfileContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  border: `4px solid ${theme.palette.primary.main}`,
  fontSize: theme.typography.pxToRem(48),
  fontWeight: 600,
  boxShadow: theme.shadows[3],
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
}));

const UserStatus = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

const ProfileCardsContainer = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(1),
}));

function Profile({ user = null }) {
  // Mock user data - replace with actual user data from props or context
  const userData = user || {
    name: 'Amandeep Singh',
    username: 'amandeep90s',
    bio: 'Full Stack Developer | React Enthusiast | Always learning new technologies',
    joinedDate: 'January 1, 2024',
    avatar: null,
    isOnline: true,
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2) || '?'
    );
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <StyledAvatar src={userData.avatar}>{!userData.avatar && getInitials(userData.name)}</StyledAvatar>
        <UserName variant="h6">{userData.name}</UserName>
        <UserStatus variant="body2">{userData.isOnline ? 'Online' : 'Offline'}</UserStatus>
      </ProfileHeader>

      <SectionTitle variant="h6">Profile Information</SectionTitle>

      <ProfileCardsContainer>
        <ProfileCard heading="Bio" description={userData.bio} icon={Person} color="primary" />
        <ProfileCard heading="Username" description={`@${userData.username}`} icon={AlternateEmail} color="secondary" />
        <ProfileCard heading="Name" description={userData.name} icon={FaceIcon} color="info" />
        <ProfileCard
          heading="Joined"
          description={dayjs(userData.joinedDate).fromNow()}
          icon={CalendarMonth}
          color="success"
        />
      </ProfileCardsContainer>
    </ProfileContainer>
  );
}

export default memo(Profile);
