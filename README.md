# Farmstedi

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-v18.0.0-green)

Farmstedi is a software that provides farmers with a suite of software solutions that allow them to get the most out of their work.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Requirements](#requirements)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/farmstedi.git
   cd farmstedi
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Ensure that the required services (MongoDB and Redis) are running locally (see [Requirements](#requirements)).
4. Set up the environment variables (see [Environment Variables](#environment-variables)).
5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- To run in development mode:
  ```sh
  npm run dev
  ```
- To build the project:
  ```sh
  npm run build
  ```
- To start in production:
  ```sh
  npm start
  ```

## Requirements

Before running the project, ensure that the following dependencies are installed and running locally:

1. **MongoDB** (A local MongoDB server should be running)
   - Install MongoDB from [MongoDB Official Site](https://www.mongodb.com/try/download/community)
   - Start MongoDB:
     ```sh
     mongod --dbpath /path/to/your/data/db
     ```
2. **Redis** (A local Redis server should be running)
   - Install Redis from [Redis Official Site](https://redis.io/download)
   - Start Redis:
     ```sh
     redis-server
     ```

## Environment Variables

Create a `.env` file and define the necessary environment variables:

```sh

#ENVIRONMENT 
NODE_ENV=development 

# Database
DB_URI=############################################

# Redis 
REDIS_HOST=localhost
REDIS_PORT=6379 
REDIS_ACCESS_TOKEN_EXP=3600
REDIS_REFRESH_TOKEN_EXP=3600000

# JWT 
JWT_ACCESS_TOKEN_EXP=1hr
JWT_REFRESH_TOKEN_EXP=7d
JWT_ACCESS_TOKEN_SECRET=fafafadfjhhkgafdgafajhfakfhakfhakfhakhfahfafafafsa
JWT_REFRESH_TOKEN_SECRET=afafdafanfafadfdfdfafafdfafafafafafafafafdfdfdfaf

# NASA POWER API 
NASA_POWER_API_ENDPOINT=https://power.larc.nasa.gov/api/temporal/daily/point

# Google GenAI
GOOGLE_GEN_AI_KEY=AIzaSyfaefaefaeefaeaeaefe
```

## API Endpoints

List important API endpoints if applicable.

Example:

| Method | Endpoint       | Description         |
|--------|----------------|---------------------|
| GET    | /api/v1/auth/signup   | Signup    |
| POST   | /api/v1/auth/signin  | Signin  |
| PUT    | /api/v1/auth/signout | Signout   |
| DELETE | /api/v1/crop/recommendations | PlantRecommendation    |

## Project Structure

```
├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── middleware
│   ├── config
│   └── index.js
├── tests
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- Redis
- TypeScript (if applicable)
- JWT Authentication
- Pino for logging

## Contributing

1. Fork the repository
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a Pull Request

## License

This project is licensed under the MIT License. You can find the full license in the `LICENSE` file in the root directory.

