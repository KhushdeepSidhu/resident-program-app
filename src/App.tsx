import React, { Suspense, lazy, FunctionComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

// React-Query
import { QueryClient, QueryClientProvider } from 'react-query';

// Components
const ResidentList = lazy(() => import('./components/residents/resident-list'));
const ProgramList = lazy(() => import('./components/programs/program-list'));

import LazyLoader from './components/common/lazy-loader';
import HomePage from './components/common/HomePage';

const queryClient = new QueryClient();

const App: FunctionComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<LazyLoader show delay={500} />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/residents" element={<ResidentList />} />
            <Route path="/programs" element={<ProgramList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
