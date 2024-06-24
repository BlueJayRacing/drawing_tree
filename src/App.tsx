import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import Login from './pages/Login';
import Home from './pages/Home';
import DrawingTree from './pages/DrawingTree';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css'; //import Mantine V7 styles needed by MRT
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //import MRT styles

// Theme override
const theme = createTheme({
  /** Put your mantine theme override here */
});

// Create a client
const queryClient = new QueryClient()

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRoute = ({ element: Element, ...rest }: any) => (
  <Element {...rest} />
);

const App: React.FC = () => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute element={Home} />} />
              <Route path="/:vehicle" element={<PrivateRoute element={DrawingTree} />} />
            </Routes>
          </Router>
        </ModalsProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default App;