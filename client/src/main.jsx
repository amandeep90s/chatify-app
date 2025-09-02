import { CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from '@/App.jsx';
import linkedinTheme from '@/theme/linkedinTheme.js';

import '@fontsource/ibm-plex-sans/300.css'; // Light
import '@fontsource/ibm-plex-sans/400.css'; // Regular
import '@fontsource/ibm-plex-sans/500.css'; // Medium
import '@fontsource/ibm-plex-sans/600.css'; // Semi-bold
import '@fontsource/ibm-plex-sans/700.css'; // Bold

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider theme={linkedinTheme}>
        <CssBaseline />
        <div onContextMenu={(e) => e.preventDefault()}>
          <App />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
