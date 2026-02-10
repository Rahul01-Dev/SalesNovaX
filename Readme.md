# SalesNovaX AI - Lead to Cash SaaS

SalesNovaX AI is a comprehensive multi-tenant SaaS platform designed to streamline the "Lead-to-Cash" lifecycle. It leverages AI capabilities to enhance sales processes, from lead generation and scoring to closing deals and managing revenue.

## Project Structure

This project is a monorepo organized into the following workspaces:

-   **`client/`**: The frontend application built with React, Vite, and Tailwind CSS.
-   **`server/`**: The backend API server built with Node.js, Express, and MongoDB.
-   **`shared/`**: Shared code and utilities (if applicable).

## Tech Stack

### Frontend (Client)
-   **Framework:** React (v19)
-   **Build Tool:** Vite
-   **Styling:** Tailwind CSS (v4)
-   **State Management/Data Fetching:** React Query (@tanstack/react-query)
-   **Routing:** React Router DOM (v7)
-   **Charts:** Recharts
-   **Drag & Drop:** @hello-pangea/dnd
-   **PDF Generation:** @react-pdf/renderer
-   **HTTP Client:** Axios

### Backend (Server)
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB (via Mongoose)
-   **Authentication:** JWT (JSON Web Tokens) & Bcrypt
-   **Email Service:** Nodemailer
-   **PDF Generation:** PDFKit
-   **Security:** Helmet, CORS

## Getting Started

### Prerequisites
-   Node.js (v18+ recommended)
-   npm or yarn
-   MongoDB instance (local or Atlas)

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd SalesFlow
    ```

2.  Install dependencies for all workspaces:
    ```bash
    npm run install:all
    ```
    Or manually:
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    ```

### Environment Variables

Create a `.env` file in the `server/` directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
# Add other necessary variables (e.g., email credentials)
```

Create a `.env` file in the `client/` directory if needed for frontend environment variables.

### Running the Application

To run both the client and server concurrently in development mode:

```bash
npm run dev
```

-   **Client:** http://localhost:5173 (default Vite port)
-   **Server:** http://localhost:5000 (or your configured PORT)

## Features (Planned/Implemented)

-   **Lead Management:** Capture, track, and score leads using AI.
-   **Dashboard:** specialized dashboards for different user roles (e.g., User, Author/Admin).
-   **Authentication:** Secure login and registration with role-based access control.
-   **PDF Generation:** Generate reports and documents dynamically.
-   **Email Integration:** Send automated emails and notifications.
-   **Analytics:** Visual insights into sales performance.

## License

This project is licensed under the ISC License.
