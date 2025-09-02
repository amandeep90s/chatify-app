import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet, useParams } from 'react-router';

import ChatList from '@/components/app/ChatList';
import Profile from '@/components/app/Profile';
import Title from '@/components/common/Title';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import { sampleChats } from '@/constants/sampleData';

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}));

const MainContentContainer = styled(Grid)(({ theme }) => ({
  flex: 1,
  height: 'calc(100vh - 64px - 56px)', // Subtract header height (64px) and footer height (~56px)
  overflow: 'hidden',
  '& .MuiGrid-item': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  '& > .MuiGrid-root': {
    height: '100%',
    overflow: 'hidden',
  },
  [theme.breakpoints.down('md')]: {
    height: 'calc(100vh - 64px - 56px)',
    minHeight: 'calc(100vh - 64px - 56px)',
    '& .MuiGrid-item': {
      minHeight: '300px',
      overflow: 'hidden',
    },
  },
}));

const ProfileGridContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderLeft: `1px solid ${theme.palette.divider}`,
  borderRight: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}05 100%)`,
    pointerEvents: 'none',
  },
}));

function AppLayout() {
  const params = useParams();
  const { chatId } = params;

  const handleDeleteChat = (e, _id, groupChat) => {
    e.preventDefault();
    // Handle chat deletion logic here
    console.log(`Deleting chat with ID: ${_id}, Group Chat: ${groupChat}`);
  };

  return (
    <LayoutContainer>
      {/* Title */}
      <Title />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <MainContentContainer container spacing={2}>
        <Grid size={{ sm: 4, md: 3 }} sx={{ display: { xs: 'none', sm: 'block' }, height: '100%', overflow: 'hidden' }}>
          <ChatList
            chats={sampleChats}
            chatId={chatId}
            newMessagesAlert={[{ chatId, count: 4 }]}
            onlineUsers={['1']}
            handleDeleteChat={handleDeleteChat}
          />
        </Grid>
        <Grid
          size={{ xs: 12, sm: 8, md: 5, lg: 6 }}
          sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
          <Outlet />
        </Grid>
        <ProfileGridContainer
          size={{ md: 4, lg: 3 }}
          sx={{ display: { xs: 'none', md: 'block' }, height: '100%', overflow: 'hidden' }}
        >
          <Profile />
        </ProfileGridContainer>
      </MainContentContainer>

      {/* Footer */}
      <Footer />
    </LayoutContainer>
  );
}

export default AppLayout;
