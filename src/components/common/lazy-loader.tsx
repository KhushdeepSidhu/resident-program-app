import React, { useEffect, useState, FunctionComponent } from 'react';
import LoadingIndicator from './loading-indicator';

type LazyLoaderProps = {
  show?: boolean;
  delay: number;
};

const LazyLoader: FunctionComponent<LazyLoaderProps> = ({ show, delay }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;
    if (!show) {
      setShowLoader(false);
      return;
    }
    if (delay === 0) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => setShowLoader(true), delay);
    }

    return () => {
      clearInterval(timeout);
    };
  }, [show, delay]);

  return showLoader ? <LoadingIndicator /> : null;
};

export default LazyLoader;
