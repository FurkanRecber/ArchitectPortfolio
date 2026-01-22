# Architect Portfolio 

**ArchiPortfolio** is a modern and dynamic web application designed for architects, interior designers, and design studios to showcase their projects, services, and team members.

The project is built following modern software development principles, utilizing **Clean Architecture** to ensure scalability and maintainability. It includes a fully manageable admin panel for content updates.

## Tech Stack

This project is a Full-Stack application developed using industry-standard technologies.

### Backend (.NET Core)
The server-side is designed with a layered structure based on **Clean Architecture** (Onion Architecture).

* **Framework:** .NET 8 (ASP.NET Core Web API)
* **Database:** PostgreSQL (with Entity Framework Core)
* **ORM:** Entity Framework Core Code-First
* **Authentication:** JWT (JSON Web Token) Bearer Auth
* **Mapping:** AutoMapper
* **Documentation:** Swagger / OpenAPI
* **File Management:** Local File System (Local Photo Service)

### Frontend (React)
The user interface is designed to provide a fast, responsive, and modern experience.

* **Build Tool:** Vite
* **Language:** TypeScript
* **UI Framework:** React v19
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **Icons:** Lucide React
* **Routing:** React Router DOM
* **HTTP Client:** Fetch API / Axios (Integrated service structure)

---

## Features

### Public Interface (Visitors)
* **Home Page:** A striking introduction, featured projects, and studio overview.
* **Projects:** Detailed project listing with category-based filtering.
* **Project Details:** Comprehensive views including project images, descriptions, and credits.
* **The Studio & Team:** Firm introduction and team member listings.
* **Contact:** Contact information and a messaging form.
* **Responsive Design:** Fully compatible with mobile and desktop devices.

### Admin Panel (Management)
* **Dashboard:** Overview of the site status.
* **Project Management:** Add, edit, and delete projects; upload project images.
* **Category Management:** Organize project categories.
* **Team Management:** Add and manage team members.
* **Site Settings:** Update general settings like logo, phone number, and email directly from the panel.
* **Inbox:** Read and reply to messages sent via the contact form (mailto integration).
* **Secure Login:** JWT-based administrator authentication.

---

## Project Structure

The project is organized as a **Monorepo**:

* `ArchiPortfolio.API`: The entry point for the Backend API.
* `ArchiPortfolio.Domain`: Database entities and core business rules.
* `ArchiPortfolio.Application`: Business logic, DTOs, Interfaces, and Services.
* `ArchiPortfolio.Infrastructure`: External services (e.g., File upload implementation).
* `ArchiPortfolio.Persistence`: Database context (DbContext), Migrations, and Repository implementations.
* `ArchiPortfolio.Client`: The React-based Frontend application.

---

## Setup & Execution

Follow these steps to run the project on your local machine.

### Prerequisites
* .NET SDK 8.0 or later
* Node.js (LTS version recommended)
* PostgreSQL Database

### 1. Backend Setup

Navigate to the project root directory in your terminal and run the following commands.
*Important: Update the Connection String in 'appsettings.json' to match your local PostgreSQL configuration.*

    cd ArchiPortfolio.API

    # Restore dependencies
    dotnet restore

    # Apply database migrations
    dotnet ef database update --project ../ArchiPortfolio.Persistence --startup-project .

    # Run the application
    dotnet watch run

*The Backend will typically run on `https://localhost:7193` (or a similar port).*

### 2. Frontend Setup

Open a new terminal and navigate to the Client folder:

    cd ArchiPortfolio.Client

    # Install packages
    npm install

    # Start the development server
    npm run dev

*The Frontend will typically run on `http://localhost:5173`.*

## 📝 License

This project is a personal portfolio work. Unauthorized commercial use is prohibited.
