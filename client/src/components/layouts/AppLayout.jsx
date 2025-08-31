import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Outlet } from 'react-router';

import Title from '@/components/common/Title';

import Footer from './Footer';
import Header from './Header';

const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const MainContentContainer = styled(Grid)(({ theme }) => ({
  flex: 1,
  height: '100%',
  '& .MuiGrid-item': {
    display: 'flex',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    minHeight: 'calc(100vh - 120px)', // Adjusted for header + title + footer
    '& .MuiGrid-item': {
      minHeight: '300px', // Minimum height for mobile grid items
    },
  },
}));

function AppLayout() {
  return (
    <LayoutContainer>
      {/* Title */}
      <Title />

      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <MainContentContainer container spacing={2}>
        <Grid size={{ sm: 4, md: 3 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
          First
        </Grid>
        <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }}>
          <Outlet />
        </Grid>
        <Grid size={{ md: 4, lg: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          Third
        </Grid>
      </MainContentContainer>

      {/* Footer */}
      <Footer />
    </LayoutContainer>
  );
}

export default AppLayout;
