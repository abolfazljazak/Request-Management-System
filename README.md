# CityFinder API 🌍

Welcome to **CityFinder API**, a powerful and modern RESTful API built with **NestJS** to manage user authentication and fetch city data based on postal codes. This project leverages the **CQRS** pattern, **TypeORM**, and **Zippopotamus API** to provide a scalable and maintainable solution for user management and city data retrieval. Whether you're a developer looking to integrate city data into your app or just exploring a well-structured backend, this project has got you covered! 🚀

---

## ✨ Features

- **User Authentication** 🔐:
  - Sign up with a unique username and secure password.
  - JWT-based authentication for protected routes.
  - Retrieve user profile data securely.

- **City Data Retrieval** 🏙️:
  - Fetch city information (e.g., place name, state, abbreviation) using postal codes via the Zippopotamus API.
  - Log all city requests for each user with detailed response data.

- **Request History** 📜:
  - View a paginated list of your city data requests with details like `postCode`, `country`, and `places`.

- **Robust Error Handling** 🚨:
  - Centralized error handling with custom Exception Filters.
  - Proper HTTP status codes and meaningful error messages.

- **Scalable Architecture** 🏗️:
  - Built with the CQRS pattern for separation of concerns.
  - Modular structure with separate layers for API, persistence, and infrastructure.

---

## 🛠️ Tech Stack

- **Framework**: NestJS (Node.js)
- **Database**: TypeORM (works with any SQL database, e.g., PostgreSQL)
- **Architecture**: CQRS (Command Query Responsibility Segregation)
- **Authentication**: JWT (JSON Web Tokens)
- **External API**: Zippopotamus (for city data)
- **Validation**: Class-validator
- **HTTP Client**: Axios (for external API calls)
- **Error Handling**: Custom Exception Filters

---

## 📋 API Endpoints

### Authentication
- **POST /api/users/sign-up**
  - Register a new user.
  - **Body**:
    ```json
    {
      "username": "john_doe123",
      "password": "Pass123"
    }
Constraints:
username: 5-12 characters, allowed: !@1234567890._
password: Min 5 characters, must include a capital letter and a number.
Response:
json

Collapse

Wrap

Copy
{
  "user": {
    "id": 1,
    "username": "john_doe123"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
GET /api/users/me
Get the authenticated user's profile.
Headers: Authorization: Bearer <token>
Response:
json

Collapse

Wrap

Copy
{
  "id": 1,
  "username": "john_doe123",
  "password": "hashed_password"
}
City Data
GET /api/cities/[postCode]
Fetch city data by postal code.
Headers: Authorization: Bearer <token>
Example: /api/cities/90210
Response:
json

Collapse

Wrap

Copy
{
  "postCode": "90210",
  "country": "United States",
  "places": [
    {
      "placeName": "Beverly Hills",
      "state": "California",
      "abbreviation": "CA"
    }
  ]
}
GET /api/cities/my-requests
Get a paginated list of your city data requests.
Headers: Authorization: Bearer <token>
Query Params:
page (default: 1)
limit (default: 10)
Example: /api/cities/my-requests?page=1&limit=10
Response:
json

Collapse

Wrap

Copy
{
  "requests": [
    {
      "postCode": "90210",
      "country": "United States",
      "places": [
        {
          "placeName": "Beverly Hills",
          "state": "California",
          "abbreviation": "CA"
        }
      ]
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
🏁 Getting Started
Prerequisites
Node.js (v16 or higher)
npm or yarn
A SQL database (e.g., PostgreSQL)
An API key for Zippopotamus (not required, as it's a free API)
Installation
Clone the repository:
bash

Collapse

Wrap

Copy
git clone https://github.com/your-username/cityfinder-api.git
cd cityfinder-api
Install dependencies:
bash

Collapse

Wrap

Copy
npm install
Set up environment variables: Create a .env file in the root directory and add the following:
env

Collapse

Wrap

Copy
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_user
DATABASE_PASSWORD=your_password
DATABASE_NAME=cityfinder_db
JWT_SECRET=your_jwt_secret
Run database migrations:
bash

Collapse

Wrap

Copy
npm run typeorm:migration:run
Start the server:
bash

Collapse

Wrap

Copy
npm run start:dev
The API will be running at http://localhost:3000.
📂 Project Structure
text

Collapse

Wrap

Copy
src/
├── modules/
│   ├── api/                # API layer (Controllers, Handlers, DTOs, Filters)
│   ├── persistence/        # Database layer (Entities, Repositories)
│   ├── infrastructure/     # External services (Auth, Encryption, Zippopotamus)
├── app.module.ts           # Root module
└── main.ts                 # Entry point
api: Contains all API-related logic (endpoints, CQRS commands/queries, error handling).
persistence: Manages database operations with TypeORM.
infrastructure: Handles external services like JWT authentication and Zippopotamus API.
🚨 Error Handling
All errors are handled centrally using a custom Exception Filter (HttpExceptionFilter). Errors return a standardized JSON response with:

statusCode: HTTP status code (e.g., 404, 409).
message: A meaningful error message.
timestamp: When the error occurred.
path: The endpoint that caused the error.
Example:

json

Collapse

Wrap

Copy
{
  "statusCode": 409,
  "message": "Username already exists",
  "timestamp": "2025-03-30T12:34:56.789Z",
  "path": "/api/users/sign-up"
}
🧪 Testing the API
You can test the API using tools like Postman or cURL.

Example: Sign Up
bash

Collapse

Wrap

Copy
curl -X POST http://localhost:3000/api/users/sign-up \
-H "Content-Type: application/json" \
-d '{"username": "john_doe123", "password": "Pass123"}'
Example: Get City Data
bash

Collapse

Wrap

Copy
curl -X GET http://localhost:3000/api/cities/90210 \
-H "Authorization: Bearer <your_jwt_token>"
🤝 Contributing
Contributions are welcome! If you'd like to contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to your branch (git push origin feature/your-feature).
Open a Pull Request.
📜 License
This project is licensed under the MIT License. See the  file for details.

📬 Contact
Have questions or suggestions? Feel free to reach out:

Email: your-email@example.com
GitHub: your-username
