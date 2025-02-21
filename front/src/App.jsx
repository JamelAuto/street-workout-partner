import React from "react";
import { Box } from "@mui/material";
import { MenuBar } from "./Menu";
import Footer from "./Footer";
import { UserProvider } from './context/UserContext';

export const App = ({ children, darkMode, onDarkModeChange }) => {
  return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        maxHeight: '100vh', // Add this
        overflow: 'hidden' // Add this
      }}>
        <MenuBar darkMode={darkMode} onDarkModeChange={onDarkModeChange} />
        <Box sx={{ 
          flex: 1,
          overflow: 'auto' // Add this to make content scrollable if needed
        }}>
          {children}
        </Box>
        <Footer />
      </Box>
  );
};