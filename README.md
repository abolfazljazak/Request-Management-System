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

- **Framework** 🖥️: NestJS (Node.js)
- **Database** 🗄️: TypeORM (works with any SQL database, e.g., PostgreSQL)
- **Architecture** 📐: CQRS (Command Query Responsibility Segregation)
- **Authentication** 🔑: JWT (JSON Web Tokens)
- **External API** 🌐: Zippopotamus (for city data)
- **Validation** ✅: Class-validator
- **HTTP Client** 📡: Axios (for external API calls)
- **Error Handling** 🚨: Custom Exception Filters

---

## 📋 API Endpoints

### Authentication 🔐

- **POST /api/users/sign-up**  
  Register a new user.  
  - **Body**:  
    ```json
    {
      "username": "john_doe123",
      "password": "Pass123"
    }
