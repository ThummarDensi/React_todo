# Todo App

This is a full-stack todo application with a React frontend and a Node.js backend.

## Project Structure

```
todo-app/
├── backend/
│   ├── .env.exmaple
│   ├── .gitignore
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Todo.js
│   │   └── User.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   │   ├── auth.js
│   │   └── todos.js
│   └── server.js
├── frontend/
│   ├── .env.exmaple
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components/
│       ├── contexts/
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       ├── services/
│       └── setupTests.js
└── README.md

```

## Backend

The backend is a Node.js application using the Express framework and MongoDB for the database.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

### Running the application

-   To start the server in development mode with nodemon, run:
    ```bash
    npm run dev
    ```
-   To start the server in production mode, run:
    ```bash
    npm start
    ```

## Frontend

The frontend is a React application.

### Prerequisites

- Node.js
- npm

### Installation

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `frontend` directory and add the following environment variable:
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```

### Running the application

-   To start the application in development mode, run:
    ```bash
    npm start
    ```
-   To build the application for production, run:
    ```bash
    npm run build
    ```

## API Endpoints

### Auth

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login a user

### Todos

-   `GET /api/todos` - Get all todos for the logged in user
-   `POST /api/todos` - Create a new todo
-   `PUT /api/todos/:id` - Update a todo
-   `DELETE /api/todos/:id` - Delete a todo
