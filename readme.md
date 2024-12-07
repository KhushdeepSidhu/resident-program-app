# Add Resident and Program Management Application

This is a React-based web application for managing residents and programs, including adding new residents, assigning them to programs, and managing program-related details. It is designed to provide a seamless and user-friendly experience with responsive design and dynamic interactions.

## Features

1. **Program Management**

   - Display list of programs.
   - Create new programs with details like name, location, and time (supports both specific time and all-day programs).
   - Add additional attributes to programs, including: - Dimensions - Tags - Facilitators - Level of care - Hobbies - Recurrence
   - Display the list of Attendees to the Program.
   - Functionality to Add a Rsident to a Program as an Attendee.
   - Display feedback when a new program is successfully created.

2. **Resident Management**

   - Display list of residents.
   - Add new residents with required details.
   - Display feedback when a new resident is successfully created.

## Technologies Used

- **React**: For building a dynamic user interface..
- **Material-UI (MUI)**: For styled components and pre-built UI elements.
- **React Query**: For efficient server state management and API calls with caching.
- **TypeScript**: For adding type safety and reducing runtime errors.
- **Jest & React Testing Library**: For unit testing and ensuring component reliability.

## Getting Started

Follow these steps to set up and run the application on your local machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KhushdeepSidhu/resident-program-app.git
   ```
2. **Navigate to the project directory**
   ```bash
   cd resident-program-app
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Start the development server**
   ```bash
   npm run dev-server
   ```
5. Open the application in your browser at http://localhost:8080.
