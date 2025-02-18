## Setup Instructions

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running
- Git

### Database Setup
1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE task_manager;
   ```

2. Create required tables by running the following SQL commands:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     username VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL
   );

   CREATE TABLE tasks (
     id SERIAL PRIMARY KEY,
     user_id INTEGER REFERENCES users(id),
     title VARCHAR(255) NOT NULL,
     description TEXT,
     is_complete BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with:
   ```
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=task_manager
   JWT_SECRET=your_jwt_secret_key
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application should now be running with:
- Backend API at http://localhost:5000
- Frontend at http://localhost:3000

### Testing
1. Run backend tests:
   ```bash
   cd backend
   npm test
   ```

2. Run frontend tests:
   ```bash
   cd frontend
   npm test
   ```


### Database Setup

1. Install PostgreSQL if you haven't already:
   ```bash
   # For Ubuntu/Debian
   sudo apt install postgresql
   
   # For macOS using Homebrew
   brew install postgresql
   ```

2. Create a new PostgreSQL database:
   ```bash
   psql -U postgres
   CREATE DATABASE task_manager;
   ```

3. Create the required tables by running the SQL migrations:
   ```bash
   cd backend
   npm run migrate
   ```

### Environment Variables

1. Create a `.env` file in the backend directory:
   ```bash
   cd backend
   touch .env
   ```

2. Update the `.env` file with your database credentials and JWT secret:
   ```
    DB_USER=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=task_management
    JWT_SECRET=e9c66d747fcfb9761b8c1f465a8da462ac2fd83a0af18a0cc88ddf56b8954a23
    PORT=5001
   ```

### Using the Application

1. Register a new account at http://localhost:3000/register
2. Log in with your credentials
3. Manage your tasks

# Salary Expectations

I expect a salary of $40 / hour

# Video
