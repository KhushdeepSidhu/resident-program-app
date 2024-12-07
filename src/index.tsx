import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';

// Error Handler
import ErrorBoundary from './components/common/error-boundary';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

const appElement = document.getElementById('app');

// Render your React component instead
if (appElement) {
  const root = createRoot(appElement);
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} else {
  console.error('App element not found');
}
