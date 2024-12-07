import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../HomePage';
import { MemoryRouter } from 'react-router-dom';

// Mock the `useNavigate` hook from `react-router-dom`
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('HomePage Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .mocked(require('react-router-dom').useNavigate)
      .mockReturnValue(mockNavigate);
  });

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // Check if all elements are rendered
    expect(screen.getByText('Browse Residents')).toBeInTheDocument();
    expect(screen.getByText('Browse Programs')).toBeInTheDocument();
  });

  test('navigates to residents page when Browse Residents button is clicked', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const browseResidentsButton = screen.getByText('Browse Residents');

    fireEvent.click(browseResidentsButton);

    // Ensure navigation was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/residents');
  });

  test('navigates to programs page when Browse Programs button is clicked', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const browseProgramsButton = screen.getByText('Browse Programs');

    fireEvent.click(browseProgramsButton);

    // Ensure navigation was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/programs');
  });
});
