# Overview

This is a modern full-stack web application that serves as a professional portfolio website for Nilanjan Chatterjee, a Senior Engineering Manager specializing in Data and ML Engineering. The application features an interactive Mandelbrot fractal background renderer and showcases professional experience, skills, and contact information through a sleek, modern interface.

The project is built as a React single-page application with an Express.js backend, utilizing TypeScript throughout for type safety. The frontend features advanced WebGL-based fractal rendering, responsive design with Tailwind CSS, and a comprehensive UI component library using shadcn/ui components built on Radix UI primitives.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using **React 18** with **TypeScript** and follows a component-based architecture. The application uses **Vite** as the build tool and development server, providing fast hot module replacement and optimized production builds.

**Key architectural decisions:**
- **Component Structure**: Modular component design with separation between page components, UI components, and feature-specific components
- **Routing**: Uses Wouter for lightweight client-side routing, keeping the bundle size minimal
- **State Management**: Leverages React Query (@tanstack/react-query) for server state management and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming, providing a dark-themed design with glass morphism effects
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessibility and consistency

**Advanced Features:**
- **WebGL Mandelbrot Renderer**: Custom WebGL implementation that renders interactive Mandelbrot fractals as a background, responding to scroll progress
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Performance Optimization**: Custom hooks for scroll tracking and mobile detection

## Backend Architecture
The backend uses **Express.js** with TypeScript, implementing a RESTful API pattern. The server is configured for both development and production environments with proper middleware setup.

**Key architectural decisions:**
- **API Structure**: RESTful endpoints prefixed with `/api` for clear separation from static assets
- **Middleware**: Request logging, JSON parsing, and error handling middleware
- **Development Setup**: Vite integration for seamless full-stack development experience
- **Static File Serving**: Efficient serving of built React application in production

## Data Storage Solutions
The application implements a flexible storage abstraction with both in-memory and database options:

**Storage Interface Design:**
- **Abstract Storage Interface**: `IStorage` interface defining CRUD operations for scalability
- **In-Memory Implementation**: `MemStorage` class for development and testing
- **Database Ready**: Configured for PostgreSQL with Drizzle ORM for production use
- **Schema Definition**: Shared TypeScript schemas using Drizzle and Zod for validation

**Database Configuration:**
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Migrations**: Drizzle Kit for database schema management
- **Connection**: Neon Database serverless PostgreSQL support
- **Type Safety**: Full TypeScript integration with inferred types

## External Dependencies

### Database & ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM with excellent TypeScript support
- **drizzle-zod**: Schema validation integration
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Frontend Framework & Libraries
- **React 18**: Core frontend framework with modern features
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library
- **date-fns**: Date manipulation and formatting

### UI & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **lucide-react**: Modern icon library

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **@replit/vite-plugin-***: Replit-specific development plugins
- **tsx**: TypeScript execution for Node.js

### Form & Validation
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation library

The architecture emphasizes type safety, performance, and maintainability while providing a solid foundation for both current features and future enhancements.
