# Software Architecture Document

## System Architecture Overview

The Recipe App is a cloud-based, mobile-first application designed to support millions of users searching for ingredients, managing user accounts, accessing a recipe database, and generating shopping lists. The system employs a microservices architecture backed by a scalable cloud infrastructure, with offline support via client-side data synchronization. The architecture separates core functionalities into distinct services to ensure scalability, maintainability, and robust offline capabilities for a seamless user experience.

### High-Level Components
- **Mobile/Web Clients**: Cross-platform apps with offline-first data storage and sync.
- **API Gateway**: Entry point for all client requests, handling authentication and routing.
- **Microservices**:
    - User Service (authentication, profiles)
    - Recipe Service (CRUD operations, search)
    - Ingredient Service (ingredient catalog, search)
    - Shopping List Service (generation, management)
- **Database Layer**: Cloud-hosted, horizontally scalable databases.
- **Search Engine**: High-performance ingredient and recipe search.
- **Sync/Offline Module**: Handles data synchronization and conflict resolution.

---

## Technology Stack

### Frontend
- **Mobile:** React Native (cross-platform), with Redux for state management and Realm/SQLite for offline storage.
- **Web:** React.js with Redux and localStorage/IndexedDB for offline support.

### Backend
- **API Gateway:** AWS API Gateway or Kong.
- **Microservices:** Node.js (Express.js) or Python (FastAPI) for service implementation.
- **Databases:**
    - **User & Shopping List Data:** PostgreSQL (Amazon Aurora for scalability).
    - **Recipe & Ingredient Data:** MongoDB (Atlas) for flexible schema, or PostgreSQL with JSONB columns.
- **Search:** Elasticsearch for full-text and ingredient search.
- **Authentication:** OAuth 2.0/JWT (via Auth0 or AWS Cognito).

### Data Sync & Offline
- **Mobile/Web:** Realm Sync or custom data sync engine (using WebSockets or REST polling).
- **Messaging/Queue:** Apache Kafka or AWS SNS/SQS for asynchronous updates.

### Hosting/Infrastructure
- **Cloud Provider:** AWS (ECS/EKS/Lambda for microservices), S3 for static assets, CloudFront for CDN.
- **Containerization:** Docker, orchestrated via Kubernetes (EKS).

### Justification
- Chosen technologies are proven at scale, support microservices, offer robust offline capabilities, and provide hosted managed services for rapid scaling and reliability.

---

## Data Models

### User
- `id` (UUID)
- `email`
- `password_hash`
- `display_name`
- `profile_picture_url`
- `created_at`
- `preferences` (JSON)

### Recipe
- `id` (UUID)
- `title`
- `description`
- `author_id` (User FK)
- `ingredients` (Array of Ingredient refs and quantities)
- `steps` (Array of text)
- `tags` (Array)
- `image_url`
- `created_at`
- `updated_at`
- `is_public` (bool)

### Ingredient
- `id` (UUID)
- `name`
- `alternative_names` (Array)
- `category`
- `nutrition_facts` (JSON)
- `unit` (g, ml, pieces, etc.)
- `created_at`

### Shopping List
- `id` (UUID)
- `user_id` (User FK)
- `items` (Array of {ingredient_id, quantity, unit, checked})
- `created_at`
- `updated_at`

#### Relationships
- **User** ↔ **Recipe**: One-to-many (users can create multiple recipes).
- **Recipe** ↔ **Ingredient**: Many-to-many via ingredients list.
- **User** ↔ **Shopping List**: One-to-many.

---

## API Specifications

### Authentication
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

### Recipe Management
- `GET /recipes?search=&tags=&ingredient=`
- `GET /recipes/{id}`
- `POST /recipes` (authenticated)
- `PUT /recipes/{id}` (author only)
- `DELETE /recipes/{id}` (author only)

### Ingredient Search
- `GET /ingredients?search=`
- `GET /ingredients/{id}`

### Shopping List
- `GET /users/{userId}/shopping-lists`
- `POST /users/{userId}/shopping-lists`
- `PUT /users/{userId}/shopping-lists/{listId}`
- `DELETE /users/{userId}/shopping-lists/{listId}`

### Sync / Offline
- `POST /sync/upload` (submit offline changes)
- `GET /sync/download` (get latest changes)

### Misc