import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createAppTheme } from './theme'; // Import the theme
import { App } from './App';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ProgramPage from './features/components/Program/ProgramPage';
import ExerciseTracker from './features/components/Dashboard/ExerciseTracker';
import ProfilePage from './features/components/Profile/ProfilePage';
import { UserProvider } from './context/UserContext';

const Main = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const theme = useMemo(() => createAppTheme(darkMode ? 'dark' : 'light'), [darkMode]);

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: theme.palette.background.default,
            },
          }}
        />
        <UserProvider>
          <App darkMode={darkMode} onDarkModeChange={handleDarkModeChange}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/program" element={<ProgramPage />} />
              <Route path="/tracker" element={<ExerciseTracker />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </App>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);