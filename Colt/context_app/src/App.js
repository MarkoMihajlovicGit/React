import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './Navbar';
import Form from './Form';
import PageContent from './PageContent';
function App() {
  return (
    <ThemeProvider>
      <PageContent>
        <LanguageProvider>
          <Navbar></Navbar>
          <Form></Form>
        </LanguageProvider>
      </PageContent>
    </ThemeProvider>
  );
}

export default App;
