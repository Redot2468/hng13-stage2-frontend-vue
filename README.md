# TicketMS Frontend Application

Welcome to TicketMS, a robust and intuitive frontend application designed to streamline ticket management processes. Built with Vue 3 and TypeScript, this project offers a seamless experience for creating, tracking, and resolving support tickets.

## 🚀 Project Overview

TicketMS is a modern web application for efficient ticket management, providing user authentication, a dashboard for tracking ticket statistics, and a comprehensive interface for handling individual tickets. It leverages the power of Vue 3 with TypeScript for robust development, Pinia for state management, and a component-based UI approach using Shadcn Vue and Tailwind CSS.

## ✨ Features

- **User Authentication**: Secure signup and login functionality with local storage-based session management.
- **Dashboard Overview**: A personalized dashboard displaying a summary of total, open, in-progress, and closed tickets.
- **Comprehensive Ticket Management**: Create new tickets, view existing ones, and easily edit or delete ticket details.
- **Dynamic Ticket Status & Priority**: Assign and update ticket status (Open, In Progress, Closed) and priority (Low, Medium, High).
- **Responsive Design**: A clean, modern, and adaptive user interface optimized for various screen sizes.
- **Client-Side Data Persistence**: Utilizes browser's `localStorage` for storing user and ticket data.
- **Robust Form Validation**: Implemented with Zod and Vee-Validate for reliable data input.
- **Reusable UI Components**: Built with Shadcn Vue for a consistent and accessible user experience.

## 🛠️ Technologies Used

| Category              | Technology                                        | Description                                                               |
| :-------------------- | :------------------------------------------------ | :------------------------------------------------------------------------ |
| **Framework**         | [Vue.js 3](https://vuejs.org/)                    | Progressive JavaScript framework for building user interfaces.            |
| **Language**          | [TypeScript](https://www.typescriptlang.org/)     | Superset of JavaScript that adds static types.                            |
| **State Mgmt.**       | [Pinia](https://pinia.vuejs.org/)                 | Intuitive, type-safe, and flexible state management for Vue.js.           |
| **Routing**           | [Vue Router](https://router.vuejs.org/)           | Official routing library for Vue.js.                                      |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com/)          | Utility-first CSS framework for rapid UI development.                     |
| **UI Library**        | [Shadcn Vue](https://www.shadcn-vue.com/)         | Reusable, accessible UI components built with Radix Vue and Tailwind CSS. |
| **Form Library**      | [VeeValidate](https://vee-validate.dev/)          | Form validation library for Vue.js.                                       |
| **Schema Validation** | [Zod](https://zod.dev/)                           | TypeScript-first schema declaration and validation library.               |
| **Build Tool**        | [Vite](https://vitejs.dev/)                       | Next-generation frontend tooling.                                         |
| **Hashing**           | [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js) | For password hashing (client-side simulation).                            |
| **Toasts**            | [Vue Sonner](https://vue-sonner.vercel.app/)      | An opinionated toast component for Vue.js.                                |

## 📦 Getting Started

Follow these steps to set up and run the project locally on your machine.

### Installation

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/Redot2468/hng13-stage2-frontend-vue.git
    cd hng-stage-2-frontend-vue
    ```

2.  **Install Dependencies**:
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```
    Or using pnpm:
    ```bash
    pnpm install
    ```

### Running the Application

1.  **Start the Development Server**:

    ```bash
    npm run dev
    ```

    This will start the Vite development server, typically at `http://localhost:5173`.

2.  **Build for Production**:

    ```bash
    npm run build
    ```

    This command builds the application for production to the `dist` folder.

3.  **Preview Production Build**:
    ```bash
    npm run preview
    ```
    This command serves the `dist` folder locally for production testing.

## 🚀 Usage

Upon launching the application, you will be directed to the landing page.

1.  **Sign Up**:
    - Navigate to the `/auth/signup` route or click "Get Started" on the landing page.
    - Fill in your name, email, and a strong password (minimum 6 characters, at least one letter and one number).
    - Click "Sign up" to create your account. Your account details will be stored in your browser's local storage.

2.  **Login**:
    - After signing up, you will be redirected to the login page (`/auth/login`).
    - Enter your registered email and password.
    - Click "Login". On successful login, you will be redirected to the dashboard.

3.  **Dashboard**:
    - The dashboard (`/dashboard`) provides an overview of your tickets, including counts for total, open, in-progress, and closed tickets.
    - Click "Go to Ticket Management" to view and manage all your tickets.

4.  **Ticket Management**:
    - On the tickets page (`/tickets`), you can see a list of all your created tickets.
    - **Create a New Ticket**: Click the "Create Your First Ticket" button. A modal will appear where you can enter the title, description, status, and priority of your new ticket.
    - **Edit a Ticket**: Each ticket card has an "Edit" (pencil icon) button. Clicking it will open the ticket form pre-filled with the ticket's current details, allowing you to make updates.
    - **Delete a Ticket**: Each ticket card also has a "Delete" (trash icon) button. Clicking it will remove the ticket from your list.
    - All changes are saved automatically to your browser's local storage.

5.  **Logout**:
    - Click the "Logout" icon in the dashboard navigation bar to end your session. You will be redirected to the landing page.

## 🤝 Contributing

This project is not currently accepting external contributions.

## 📄 License

This project does not currently have an explicit license file. Please contact the repository owner for licensing information.

## ✍️ Author

- **Ridwan**
  - LinkedIn: [https://linkedin.com/in/yourusername](https://linkedin.com/in/yourusername)
  - Twitter: [https://twitter.com/yourusername](https://twitter.com/yourusername)

---

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-3.x-FFD700?style=flat&logo=pinia)](https://pinia.vuejs.org/)
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
