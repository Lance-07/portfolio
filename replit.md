# Personal Portfolio Website

## Overview

This is a full-stack personal portfolio website built with React, Express.js, and PostgreSQL. The application features a modern, responsive design showcasing skills, projects, and contact information. It uses shadcn/ui components for a polished user interface and includes a contact form for visitor inquiries.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: In-memory storage with potential for PostgreSQL sessions

### Key Design Decisions
1. **Monorepo Structure**: Client, server, and shared code in a single repository for simplified development
2. **Type Safety**: Full TypeScript implementation across frontend and backend
3. **Component-Based UI**: Leveraging shadcn/ui for consistent, accessible components
4. **Serverless Database**: Using Neon PostgreSQL for scalable, managed database hosting
5. **Modern Tooling**: Vite for frontend builds, ESBuild for backend bundling

## Key Components

### Frontend Components
- **Layout**: Responsive navigation with mobile hamburger menu
- **Sections**: Home hero, skills showcase, projects gallery, contact form
- **UI Components**: Comprehensive shadcn/ui component library including cards, buttons, forms, tooltips
- **Icons**: Lucide React icons and react-icons for technology logos
- **Animations**: Smooth scrolling and section transitions

### Backend Components
- **Server**: Express.js with middleware for JSON parsing, CORS, and request logging
- **Storage Interface**: Abstracted storage layer with in-memory implementation
- **Database Schema**: User management with username/password authentication
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Shared Components
- **Schema**: Drizzle ORM schema definitions with Zod validation
- **Types**: Shared TypeScript interfaces for type safety across client/server

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests, interact with storage layer
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: Structured JSON responses with proper error handling
5. **Client Updates**: TanStack Query manages cache updates and UI state

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Router)
- UI library (Radix UI components, shadcn/ui)
- Styling (Tailwind CSS, class-variance-authority)
- State management (TanStack Query)
- Icons (Lucide React, react-icons)
- Forms (React Hook Form, Zod validation)

### Backend Dependencies
- Server framework (Express.js, TypeScript)
- Database (Drizzle ORM, Neon PostgreSQL client)
- Development tools (tsx, esbuild)
- Session management (connect-pg-simple)

### Development Dependencies
- Build tools (Vite, ESBuild, TypeScript)
- Replit integrations (error overlay, cartographer)
- CSS processing (PostCSS, Autoprefixer)

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR and TypeScript checking
- **Backend**: tsx for TypeScript execution with auto-restart
- **Database**: Drizzle push for schema migrations

### Production
- **Frontend**: Vite build to optimized static assets
- **Backend**: ESBuild bundle to single JavaScript file
- **Database**: PostgreSQL connection via environment variables
- **Serving**: Express serves both API routes and static frontend files

### Environment Configuration
- DATABASE_URL for PostgreSQL connection
- NODE_ENV for environment-specific behavior
- Replit-specific configurations for development tools

## Changelog

- July 08, 2025. Initial setup
- July 08, 2025. Added comprehensive dark mode support with theme provider, toggle component, and dark variants for all UI elements  
- July 08, 2025. Added public folder structure for project images with fallback icon system

## User Preferences

Preferred communication style: Simple, everyday language.