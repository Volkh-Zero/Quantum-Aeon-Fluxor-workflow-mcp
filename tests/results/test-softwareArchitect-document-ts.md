# Software Architecture Document

## System Architecture Overview

The Recipe App is a scalable, cloud-native platform that enables users to search for ingredients, manage user accounts, browse and store recipes, and generate shopping lists. To ensure high scalability and reliability for millions of users, the system leverages a microservices architecture, backed by cloud infrastructure. Offline functionality is achieved through a combination of local storage, service workers, and synchronization mechanisms.

Key architectural principles:
- Microservices for modularity, scalability, and maintainability
- Cloud-native infrastructure (container orchestration, managed databases)
- Progressive Web App (PWA) features for offline support
- RESTful APIs for client-server communication
- Strong authentication and data security

## Technology Stack

- **Frontend:**  
  - React.js with Redux Toolkit (state management)
  - TypeScript (type safety)
  - Service Workers (offline support/PWA)
  - IndexedDB (local storage for offline mode)
- **Backend:**  
  - Node.js with Express.js (REST API microservices)
  - TypeScript (backend consistency)
  - Redis (caching for performance)
  - Worker queues (e.g., BullMQ) for async tasks (sync, notifications)
- **Databases:**  
  - PostgreSQL (relational data: users, recipes, lists)
  - Elasticsearch (ingredient and recipe search)
- **Authentication:**  
  - OAuth 2.0 / OpenID Connect (JWT tokens)
- **DevOps & Infrastructure:**  
  - Docker, Kubernetes (scalability, orchestration)
  - AWS/GCP/Azure (managed services, autoscaling)
  - Cloud CDN (static asset distribution)
- **Others:**  
  - API Gateway (rate limiting, security)
  - Monitoring (Prometheus, Grafana)
  - CI/CD (GitHub Actions, ArgoCD)

## Data Models

### User
- **id:** UUID (PK)
- **email:** String (unique)
- **passwordHash:** String
- **name:** String
- **createdAt / updatedAt:** Timestamps
- **preferences:** JSON

### Recipe
- **id:** UUID (PK)
- **title:** String
- **description:** Text
- **ingredients:** [RecipeIngredient]
- **instructions:** Text
- **authorId:** UUID (FK to User)
- **tags:** [String]
- **createdAt / updatedAt:** Timestamps
- **public:** Boolean

### Ingredient
- **id:** UUID (PK)
- **name:** String
- **category:** String
- **nutritionalInfo:** JSON

### RecipeIngredient (Join Table)
- **recipeId:** UUID (FK)
- **ingredientId:** UUID (FK)
- **quantity:** String
- **unit:** String

### ShoppingList
- **id:** UUID (PK)
- **userId:** UUID (FK)
- **name:** String
- **items:** [ShoppingListItem]
- **createdAt / updatedAt:** Timestamps

### ShoppingListItem
- **id:** UUID (PK)
- **ingredientId:** UUID (FK)
- **quantity:** String
- **checked:** Boolean

## API Specifications

### Authentication
- `POST /api/v1/auth/register` – Register new user
- `POST /api/v1/auth/login` – Login, returns JWT
- `POST /api/v1/auth/refresh` – Refresh JWT

### Ingredient Search
- `GET /api/v1/ingredients/search?q=tomato` – Search ingredients (Elasticsearch-backed)

### Recipe APIs
- `GET /api/v1/recipes?search=&tags=` – List/search recipes
- `GET /api/v1/recipes/{id}` – Get recipe by ID
- `POST /api/v1/recipes` – Create recipe (auth required)
- `PUT /api/v1/recipes/{id}` – Update recipe (auth, author only)
- `DELETE /api/v1/recipes/{id}` – Delete recipe (auth, author only)

### Shopping List
- `GET /api/v1/shopping-lists` – List user’s shopping lists
- `POST /api/v1/shopping-lists` – Create shopping list
- `PUT /api/v1/shopping-lists/{id}` – Update shopping list
- `DELETE /api/v1/shopping-lists/{id}` – Delete shopping list

### Offline Sync
- `POST /api/v1/sync` – Push local changes (recipes, shopping lists)
- `GET /api/v1/sync` – Pull remote changes

## Component Breakdown

### 1. Frontend (PWA)
- Recipe browsing/search
- Ingredient search
- User authentication/registration
- Shopping list management
- Offline mode: local cache, sync UI, conflict resolution

### 2