# Listing Site Backend

This is the backend service for a listing website built with **Node.js** and **Express**. It handles all CRUD operations for listings, user listings, and listing views. Additionally, it features Firebase Admin integration and includes proper server shutdown handling.

## Features

- Fetch all listings
- Fetch listing by ID
- Add views to listings
- Fetch listings by user
- Create, update, and delete listings
- CORS enabled for a frontend running on `http://localhost:4200`
- Graceful server shutdown and error handling

## Prerequisites

Make sure you have the following installed:

- Node.js
- MySQL database
- Firebase Admin SDK

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL** - Relational database
- **Firebase Admin SDK** - User and listing management
- **CORS** - Cross-Origin Resource Sharing (configured for frontend at `http://localhost:4200`)

## Installation

1. Clone this repository:

    ```bash
    git clone https://github.com/yourusername/listing-site-backend.git
    cd listing-site-backend
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the Firebase Admin SDK:
   - Download your Firebase project credentials (`credentials.json`) from the Firebase Console.
   - Place the `credentials.json` file in the root of the project.

4. Configure the MySQL database:
   - Make sure you have MySQL installed and running.
   - Update the `./database.js` file with your MySQL connection settings.

5. Start the server:

    ```bash
    npm start
    ```

   The server will be running on `http://localhost:8000`.

## API Endpoints

### 1. Get All Listings

- **Route:** `GET /`
- **Description:** Fetches all the listings from the database.
  
### 2. Get Listing by ID

- **Route:** `GET /:id`
- **Description:** Fetches a single listing by its unique ID.
  
### 3. Add View to Listing

- **Route:** `POST /add-view/:id`
- **Description:** Increments the view count of a specific listing.

### 4. Get Listings by User

- **Route:** `GET /user/:userId`
- **Description:** Fetches all listings created by a specific user.

### 5. Create a New Listing

- **Route:** `POST /create`
- **Description:** Creates a new listing.

### 6. Update a Listing

- **Route:** `PUT /update/:id`
- **Description:** Updates an existing listing.

### 7. Delete a Listing

- **Route:** `DELETE /delete/:id`
- **Description:** Deletes a listing by its unique ID.

## Graceful Shutdown

This backend gracefully handles server shutdown:

- Closes all MySQL connections
- Listens for termination signals like `​⬤
