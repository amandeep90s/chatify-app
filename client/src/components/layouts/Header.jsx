import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router';

import { useDialogs } from '@/hooks';

const SearchDialog = lazy(() => import('@/components/app/Search'));
const NotificationDialog = lazy(() => import('@/components/app/Notifications'));
const NewGroupDialog = lazy(() => import('@/components/app/NewGroup'));

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  zIndex: theme.zIndex.appBar,
}));

const HeaderText = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.25rem',
});

const HeaderLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease-in-out',
  '&:hover': {
    opacity: 0.8,
  },
});

const ActionButton = ({ title, icon, onClick }) => {
  const IconComponent = icon;
  return (
    <Tooltip title={title} arrow>
      <IconButton color="inherit" size="large" onClick={onClick}>
        <IconComponent />
      </IconButton>
    </Tooltip>
  );
};

function Header() {
  const navigate = useNavigate();

  // State for managing dialog/modal visibility using custom hook
  const { dialogs, toggleDialog } = useDialogs({
    mobile: false,
    search: false,
    newGroup: false,
    notification: false,
  });

  const handleNavigation = (path) => {
    navigate(path);
  };

  const headerActions = [
    {
      title: 'Notification',
      icon: NotificationsIcon,
      onClick: () => toggleDialog('notification'),
    },
    {
      title: 'Search',
      icon: SearchIcon,
      onClick: () => toggleDialog('search'),
    },
    {
      title: 'New Group',
      icon: AddIcon,
      onClick: () => toggleDialog('newGroup'),
    },
    {
      title: 'Manage Groups',
      icon: GroupIcon,
      onClick: () => handleNavigation('/groups'),
    },
    {
      title: 'Logout',
      icon: LogoutIcon,
      onClick: () => handleNavigation('/login'), // Fixed logout navigation
    },
  ];

  return (
    <>
      <HeaderContainer>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <HeaderLink to="/">
              <HeaderText sx={{ display: { xs: 'none', sm: 'block' } }} variant="h6">
                Chatify
              </HeaderText>
            </HeaderLink>

            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={() => toggleDialog('mobile')}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box>
              {headerActions.map(({ title, icon, onClick }) => (
                <ActionButton key={title} title={title} icon={icon} onClick={onClick} />
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </HeaderContainer>

      <Suspense fallback={<Backdrop open />}>
        {/* Search Dialog */}
        {dialogs.search && <SearchDialog open={dialogs.search} onClose={() => toggleDialog('search')} />}

        {/* Notification Dialog */}
        {dialogs.notification && (
          <NotificationDialog open={dialogs.notification} onClose={() => toggleDialog('notification')} />
        )}

        {/* New Group */}
        {dialogs.newGroup && <NewGroupDialog open={dialogs.newGroup} onClose={() => toggleDialog('newGroup')} />}
      </Suspense>
    </>
  );
}

export default Header;
