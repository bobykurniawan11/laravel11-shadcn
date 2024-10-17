# Laravel 11 Starter Package with Inertia.js, Shadcn, and Zustand

This is a starter package built with Laravel 11, Inertia.js, Shadcn, and Zustand for state management. It provides a solid foundation for building modern, reactive applications using these tools.

## Features

-   **Laravel 11**: The latest version of the popular PHP framework for backend development.
-   **Inertia.js**: A framework for building single-page applications without writing an API.
-   **Shadcn**: A design system built on modern web technologies.
-   **Zustand**: A simple, scalable state management library for JavaScript and TypeScript.

## Getting Started

### Prerequisites

Make sure you have the following installed:

-   PHP 8.2+
-   Composer
-   Node.js & npm (or Yarn)
-   A database like MySQL or PostgreSQL

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/bobykurniawan11/laravel11-shadcn
    ```

2. Navigate to the project directory:

    ```bash
    cd laravel-inertia-shadcn-zustand-starter
    ```

3. Install PHP dependencies using Composer:

    ```bash
    composer install
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

5. Set up your .env file by copying the example:

    ```bash
    cp .env.example .env
    ```

6. Generate an application key:

    ```bash
    php artisan key:generate
    ```

7. Run the database migrations:

    ```bash
    php artisan migrate
    ```

8. Start the local development server:

    ```bash
    php artisan serve
    ```

9. Start the Vite server for frontend development:

    ```bash
    npm run dev
    ```

10. Open your browser and navigate to `http://localhost:8000` to see the application in action.
