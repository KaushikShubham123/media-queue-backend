# Media Processing Queue API

A backend service built with **NestJS** that simulates **asynchronous
media processing jobs** (video, image, audio).\
This project is focusing on clean
architecture, validation, background processing, and API design.

------------------------------------------------------------------------

## Tech Stack

-   Node.js
-   NestJS
-   TypeScript
-   PostgreSQL
-   TypeORM (with migrations)
-   Swagger (OpenAPI)
-   Docker & Docker Compose (optional)

------------------------------------------------------------------------

## Features

-   Create media processing jobs
-   Asynchronous background job simulation
-   Job lifecycle: `PENDING → PROCESSING → COMPLETED`
-   Progress tracking (0--100%)
-   Pagination & filtering
-   Input validation using DTOs
-   Rate limiting (10 requests / 60 seconds per IP)
-   Swagger API documentation
-   Environment-based configuration
-   Dockerized setup

------------------------------------------------------------------------

## Project Structure

    src/
     ├── jobs/
     │   ├── jobs.controller.ts
     │   ├── jobs.service.ts
     │   ├── jobs.processor.ts
     │   ├── jobs.module.ts
     │   ├── dto/
     │   │   └── create-job.dto.ts
     │   ├── entities/
     │   │   └── job.entity.ts
     │   └── enums/
     │       └── job-status.enum.ts
     ├── common/
     ├── data-source.ts
     ├── app.module.ts
     └── main.ts

------------------------------------------------------------------------

## Environment Variables

Create a `.env` file in the project root:

    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=
    DB_PASSWORD=
    DB_NAME=media_queue

------------------------------------------------------------------------

## How to Run the Project Locally (Without Docker)

### 1. Install dependencies

    npm install

### 2. Ensure PostgreSQL is running

Create a database named `media_queue`.

### 3. Run database migrations

    npm run migration:run

### 4. Start the application

    npm run start:dev

### 5. Access the application

-   API: http://localhost:3000
-   Swagger Docs: http://localhost:3000/api/docs

------------------------------------------------------------------------

## How to Run the Project With Docker

### 1. Build and start services

    docker compose up --build

### 2. Run migrations inside the container

    docker compose exec app npm run migration:run

### 3. Access the application

-   API: http://localhost:3000
-   Swagger Docs: http://localhost:3000/api/docs

------------------------------------------------------------------------

## How to Run Tests

Basic test setup is available using NestJS defaults.

    npm run test

------------------------------------------------------------------------

## API Documentation (Swagger)

Swagger UI is available at:

    GET /api/docs

It documents all endpoints, request/response schemas, and validation
rules.

------------------------------------------------------------------------

## Design Decisions & Trade-offs

-   **cron-based background processor** is used instead of a real
    queue (BullMQ/RabbitMQ) to keep the solution simple and
    dependency-free.
-   **Media files are not uploaded**; only metadata is stored and
    processing is simulated.
-   **TypeORM + PostgreSQL** were chosen for clarity and ease of
    migration handling.
-   **Migrations over synchronize** to follow production-safe practices.

------------------------------------------------------------------------

## Improvements With More Time

-   Replace cron job with a real message queue (BullMQ / Redis)
-   Implement webhook retries and failure handling
-   Add more unit and e2e tests
-   Add authentication and authorization if needed
-   Improve logging 

------------------------------------------------------------------------

## Bonus Challenges Implemented

-   Rate limiting (10 requests / 60 seconds per IP)

------------------------------------------------------------------------
