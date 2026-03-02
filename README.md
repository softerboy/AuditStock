# Product Inventory Management System

A Laravel-based application for managing product inventory with audit logging and administrative controls.

## Prerequisites

- PHP 8.2 or higher
- Node.js & NPM
- Composer
- SQLite (or your preferred database engine)

## Installation Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/softerboy/AuditStock.git
    cd AuditStock
    ```

2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

3.  **Install frontend dependencies:**
    ```bash
    npm install
    ```

4.  **Configure the environment:**
    - Copy the example environment file:
      ```bash
      cp .env.example .env
      ```
    - Generate an application key:
      ```bash
      php artisan key:generate
      ```
    - Set the **VAT value** in your `.env` file (e.g., for 20% VAT):
      ```env
      APP_VAT=0.20
      ```

5.  **Database setup:**
    - Create an empty SQLite database (if using the default SQLite connection):
      ```bash
      touch database/database.sqlite
      ```
    - Run migrations and seeders:
      ```bash
      php artisan migrate --seed
      ```

## Running the Application

1.  **Start the development server:**
    ```bash
    php artisan serve
    ```

2.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```

3.  **Access the application:**
    Open `http://localhost:8000` in your browser.

## Default Accounts (Seeded)

- **Admin User:** `admin@mail.com` / `admin`
- **Standard User:** `user@mail.com` / `user`

## Features

- **Product Management:** Full CRUD operations for products.
- **VAT Calculation:** Automated total price calculation including VAT (configurable via `.env`).
- **Audit Logging:** Tracks all creation, updates, and deletions of products (available to admins at `/audit`).
- **Inertia.js + React:** Modern, responsive frontend using shadcn/ui components.
- **Security:** Role-based access control (Admin/User).
